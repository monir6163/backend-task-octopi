import { Types } from 'mongoose';

export enum ResourceType {
   ROOM = 'ROOM',
   DESK = 'DESK',
   DEVICE = 'DEVICE',
}

export type IResource = {
   _id?: Types.ObjectId;

   organizationId: Types.ObjectId;

   name: string;

   type: ResourceType;

   bufferTime: number;

   isDeleted: boolean;

   createdAt?: Date;
   updatedAt?: Date;
};
