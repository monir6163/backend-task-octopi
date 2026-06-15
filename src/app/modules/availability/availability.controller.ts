import { Request, Response } from 'express';

import { AvailabilityService } from './availability.service';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';

const getAvailability = catchAsync(async (req: Request, res: Response) => {
   const { resourceId, date, duration } = req.query;

   const result = await AvailabilityService.getAvailability(
      resourceId as string,
      date as string,
      Number(duration),
      req.user
   );

   sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Availability fetched successfully',
      data: result,
   });
});

export const AvailabilityController = {
   getAvailability,
};
