import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { OrganizationService } from './organization.service';

const createOrganization = catchAsync(async (req: Request, res: Response) => {
   const result = await OrganizationService.createOrganization(req.body);

   sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Organization created successfully',
      data: result,
   });
});

const getMyOrganization = catchAsync(async (req: Request, res: Response) => {
   const organizationId = req?.user?.organizationId as string;

   const result = await OrganizationService.getMyOrganization(organizationId);

   sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Organization fetched successfully',
      data: result,
   });
});

const updateOrganization = catchAsync(async (req: Request, res: Response) => {
   const organizationId = req?.user?.organizationId as string;

   const result = await OrganizationService.updateOrganization(
      organizationId,
      req.body
   );

   sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Organization updated successfully',
      data: result,
   });
});

export const OrganizationController = {
   createOrganization,
   getMyOrganization,
   updateOrganization,
};
