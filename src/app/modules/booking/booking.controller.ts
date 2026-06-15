import { Request, Response } from 'express';

import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { BookingService } from './booking.service';

const createBooking = catchAsync(async (req: Request, res: Response) => {
   const result = await BookingService.createBooking(req.body, req.user);

   sendResponse(res, {
      success: true,
      statusCode: 201,
      message: 'Booking created successfully',
      data: result,
   });
});

const getBookings = catchAsync(async (req: Request, res: Response) => {
   const result = await BookingService.getBookings(req?.user?.organizationId);

   sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Bookings fetched successfully',
      data: result,
   });
});

const cancelBooking = catchAsync(async (req: Request, res: Response) => {
   const result = await BookingService.cancelBooking(
      req.params.id,
      req?.user?.organizationId
   );

   sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Booking cancelled successfully',
      data: result,
   });
});

export const BookingController = {
   createBooking,
   getBookings,
   cancelBooking,
};
