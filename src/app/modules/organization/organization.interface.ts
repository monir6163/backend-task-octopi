import { Types } from 'mongoose';

export type IWorkingHours = {
   start: string;
   end: string;
};

export type IBookingConfig = {
   minDuration: number;
   maxDuration: number;
   advanceBookingDays: number;
   workingHours: IWorkingHours;
};

export type IOrganization = {
   _id?: Types.ObjectId;

   name: string;

   timezone: string;

   isActive: boolean;

   bookingConfig: IBookingConfig;

   createdAt?: Date;
   updatedAt?: Date;
};
