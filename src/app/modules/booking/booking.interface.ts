import { Types } from 'mongoose';

export enum BookingStatus {
   ACTIVE = 'ACTIVE',
   CANCELLED = 'CANCELLED',
}

export type IBooking = {
   _id?: Types.ObjectId;

   organizationId: Types.ObjectId;
   resourceId: Types.ObjectId;
   userId: Types.ObjectId;

   startTime: Date;
   endTime: Date;

   status: BookingStatus;

   createdAt?: Date;
   updatedAt?: Date;
};
