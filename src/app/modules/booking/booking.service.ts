/* eslint-disable @typescript-eslint/no-explicit-any */

import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { Resource } from '../resource/resource.model';
import { Booking } from './booking.model';

/**
 * 1. RESOURCE VALIDATION
 */
const validateResource = async (resourceId: string, organizationId: string) => {
   const resource = await Resource.findOne({
      _id: resourceId,
      organizationId,
      isDeleted: false,
   });

   if (!resource) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Resource not found');
   }

   return resource;
};

/**
 * 2. CONVERT TIME (ORG TIMEZONE → UTC)
 */
// const convertToUTC = (time: string, timezone: string) => {
//    return DateTime.fromISO(time, { zone: timezone }).toUTC().toJSDate();
// };

/**
 * 3. CONFLICT DETECTION (🔥 MAIN LOGIC)
 */
const checkConflict = async (
   resourceId: string,
   startTime: Date,
   endTime: Date
) => {
   const conflict = await Booking.findOne({
      resourceId,
      status: 'ACTIVE',
      startTime: { $lt: endTime },
      endTime: { $gt: startTime },
   });

   return conflict;
};

/**
 * 4. BUFFER TIME CHECK
 */
const applyBuffer = (endTime: Date, bufferMinutes: number) => {
   return new Date(new Date(endTime).getTime() + bufferMinutes * 60 * 1000);
};

/**
 * 5. CREATE BOOKING
 */
const createBooking = async (payload: any, user: any) => {
   const { resourceId, startTime, endTime } = payload;

   const orgId = user.organizationId;

   // STEP 1: Validate Resource
   const resource = await validateResource(resourceId, orgId);

   // STEP 2: Convert Time (Assume org timezone is stored in user/org)
   const startUTC = new Date(startTime);
   const endUTC = new Date(endTime);

   // STEP 3: Duration validation
   if (endUTC <= startUTC) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid time range');
   }

   // STEP 4: Conflict Check (🔥 IMPORTANT)
   const conflict = await checkConflict(resourceId, startUTC, endUTC);

   if (conflict) {
      throw new ApiError(StatusCodes.CONFLICT, 'Booking conflict detected');
   }

   // STEP 5: Buffer Time Logic
   const bufferEnd = applyBuffer(endUTC, resource.bufferTime);

   const bufferConflict = await checkConflict(resourceId, startUTC, bufferEnd);

   if (bufferConflict) {
      throw new ApiError(StatusCodes.CONFLICT, 'Buffer time conflict detected');
   }

   // STEP 6: Create Booking
   const booking = await Booking.create({
      organizationId: orgId,
      resourceId,
      userId: user.userId,
      startTime: startUTC,
      endTime: endUTC,
      status: 'ACTIVE',
   });

   return booking;
};

/**
 * 6. GET BOOKINGS
 */
const getBookings = async (organizationId: string) => {
   return await Booking.find({
      organizationId,
   })
      .populate('resourceId')
      .sort({ createdAt: -1 });
};

/**
 * 7. CANCEL BOOKING
 */
const cancelBooking = async (bookingId: string, organizationId: string) => {
   const booking = await Booking.findOneAndUpdate(
      {
         _id: bookingId,
         organizationId,
      },
      {
         status: 'CANCELLED',
      },
      { new: true }
   );

   if (!booking) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Booking not found');
   }

   return booking;
};

export const BookingService = {
   createBooking,
   getBookings,
   cancelBooking,
};
