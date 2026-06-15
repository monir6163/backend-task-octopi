/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DateTime } from 'luxon';

import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { Booking } from '../booking/booking.model';
import { Resource } from '../resource/resource.model';

/**
 * SAFE TYPES
 */
type IBufferedBooking = {
   startTime: Date;
   endTime: Date;
};

const getDayRange = (date: string, timezone: string) => {
   const startOfDay = DateTime.fromISO(date, { zone: timezone })
      .startOf('day')
      .toUTC()
      .toJSDate();

   const endOfDay = DateTime.fromISO(date, { zone: timezone })
      .endOf('day')
      .toUTC()
      .toJSDate();

   return { startOfDay, endOfDay };
};

const getBookings = async (resourceId: string, start: Date, end: Date) => {
   return await Booking.find({
      resourceId,
      status: 'ACTIVE',
      startTime: { $lt: end },
      endTime: { $gt: start },
   }).lean(); // 🔥 IMPORTANT FIX
};

const applyBuffer = (bookings: any[], buffer: number): IBufferedBooking[] => {
   return bookings.map(b => {
      const end = new Date(new Date(b.endTime).getTime() + buffer * 60000);

      return {
         startTime: b.startTime,
         endTime: end,
      };
   });
};

const generateSlots = (
   start: DateTime,
   end: DateTime,
   duration: number,
   bookings: IBufferedBooking[]
) => {
   const slots: { start: string; end: string }[] = [];

   let current = start;

   while (current.plus({ minutes: duration }) <= end) {
      const slotStart = current;
      const slotEnd = current.plus({
         minutes: duration,
      });

      const isConflict = bookings.some(b => {
         const bookingStart = DateTime.fromJSDate(b.startTime);
         const bookingEnd = DateTime.fromJSDate(b.endTime);

         return (
            slotStart.toUTC() < bookingEnd && slotEnd.toUTC() > bookingStart
         );
      });

      if (!isConflict) {
         slots.push({
            start: slotStart.toISO() as string,
            end: slotEnd.toISO() as string,
         });
      }

      current = current.plus({ minutes: 15 }); // step interval
   }

   return slots;
};

const getAvailability = async (
   resourceId: string,
   date: string,
   duration: number,
   user: any
) => {
   const timezone = user.organizationTimezone || 'UTC';
   const buffer = user.bookingBuffer || 0;

   // 1. Resource check
   const resource = await Resource.findOne({
      _id: resourceId,
      organizationId: user.organizationId,
      isDeleted: false,
   });

   if (!resource) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Resource not found');
   }

   // 2. Day range (timezone safe)
   const { startOfDay, endOfDay } = getDayRange(date, timezone);

   // 3. Get bookings
   let bookings = await getBookings(resourceId, startOfDay, endOfDay);

   // 4. Apply buffer
   if (resource.bufferTime > 0) {
      bookings = applyBuffer(bookings, resource.bufferTime);
   }

   // 5. Generate slots
   const slots = generateSlots(
      DateTime.fromJSDate(startOfDay).setZone(timezone),
      DateTime.fromJSDate(endOfDay).setZone(timezone),
      duration,
      bookings
   );

   return slots;
};
export const AvailabilityService = {
   getAvailability,
};
