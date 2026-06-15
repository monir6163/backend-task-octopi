import { model, Schema } from 'mongoose';

export enum ResourceType {
   ROOM = 'ROOM',
   DESK = 'DESK',
   DEVICE = 'DEVICE',
}

const resourceSchema = new Schema(
   {
      organizationId: {
         type: Schema.Types.ObjectId,
         ref: 'Organization',
         required: true,
         index: true,
      },

      name: {
         type: String,
         required: true,
         trim: true,
      },

      type: {
         type: String,
         enum: Object.values(ResourceType),
         required: true,
      },

      bufferTime: {
         type: Number,
         default: 0,
      },

      isDeleted: {
         type: Boolean,
         default: false,
      },
   },
   {
      timestamps: true,
   }
);

resourceSchema.index(
   {
      organizationId: 1,
      name: 1,
   },
   {
      unique: true,
   }
);

export const Resource = model('Resource', resourceSchema);
