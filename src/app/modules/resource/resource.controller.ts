import { Request, Response } from 'express';

import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { ResourceService } from './resource.service';

const createResource = catchAsync(async (req: Request, res: Response) => {
   const result = await ResourceService.createResource(
      req.body,
      req?.user?.organizationId
   );

   sendResponse(res, {
      success: true,
      statusCode: 201,
      message: 'Resource created successfully',
      data: result,
   });
});

const getAllResources = catchAsync(async (req: Request, res: Response) => {
   const result = await ResourceService.getAllResources(
      req?.user?.organizationId
   );

   sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Resources fetched successfully',
      data: result,
   });
});

const getSingleResource = catchAsync(async (req: Request, res: Response) => {
   const result = await ResourceService.getSingleResource(
      req.params.id,
      req?.user?.organizationId
   );

   sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Resource fetched successfully',
      data: result,
   });
});

const updateResource = catchAsync(async (req: Request, res: Response) => {
   const result = await ResourceService.updateResource(
      req.params.id,
      req?.user?.organizationId,
      req.body
   );

   sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Resource updated successfully',
      data: result,
   });
});

const deleteResource = catchAsync(async (req: Request, res: Response) => {
   const result = await ResourceService.deleteResource(
      req.params.id,
      req?.user?.organizationId
   );

   sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Resource deleted successfully',
      data: result,
   });
});

export const ResourceController = {
   createResource,
   getAllResources,
   getSingleResource,
   updateResource,
   deleteResource,
};
