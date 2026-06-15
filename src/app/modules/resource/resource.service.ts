import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IResource } from './resource.interface';
import { Resource } from './resource.model';

const createResource = async (payload: IResource, organizationId: string) => {
   const exists = await Resource.findOne({
      organizationId,
      name: payload.name,
      isDeleted: false,
   });

   if (exists) {
      throw new ApiError(
         StatusCodes.CONFLICT,
         'Resource already exists in this organization'
      );
   }

   const result = await Resource.create({
      ...payload,
      organizationId,
   });

   return result;
};

const getAllResources = async (organizationId: string) => {
   const resources = await Resource.find({
      organizationId,
      isDeleted: false,
   }).sort({ createdAt: -1 });

   return resources;
};

const getSingleResource = async (
   resourceId: string,
   organizationId: string
) => {
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

const updateResource = async (
   resourceId: string,
   organizationId: string,
   payload: Partial<IResource>
) => {
   const resource = await Resource.findOneAndUpdate(
      {
         _id: resourceId,
         organizationId,
         isDeleted: false,
      },
      payload,
      { new: true, runValidators: true }
   );

   if (!resource) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Resource not found');
   }

   return resource;
};

const deleteResource = async (resourceId: string, organizationId: string) => {
   const resource = await Resource.findOneAndUpdate(
      {
         _id: resourceId,
         organizationId,
         isDeleted: false,
      },
      {
         isDeleted: true,
      },
      { new: true }
   );

   if (!resource) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Resource not found');
   }

   return resource;
};

export const ResourceService = {
   createResource,
   getAllResources,
   getSingleResource,
   updateResource,
   deleteResource,
};
