import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IOrganization } from './organization.interface';
import { Organization } from './organization.model';

const createOrganization = async (payload: IOrganization) => {
   const exists = await Organization.findOne({
      name: payload.name,
   });

   if (exists) {
      throw new ApiError(
         StatusCodes.CONFLICT,
         'Organization with this name already exists'
      );
   }

   const result = await Organization.create(payload);

   return result;
};

const getMyOrganization = async (organizationId: string) => {
   const organization = await Organization.findById(organizationId);

   if (!organization) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Organization not found');
   }

   return organization;
};

const updateOrganization = async (
   organizationId: string,
   payload: Partial<IOrganization>
) => {
   const organization = await Organization.findByIdAndUpdate(
      organizationId,
      payload,
      {
         new: true,
         runValidators: true,
      }
   );

   if (!organization) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Organization not found');
   }

   return organization;
};

export const OrganizationService = {
   createOrganization,
   getMyOrganization,
   updateOrganization,
};
