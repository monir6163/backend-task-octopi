import { model, Schema } from 'mongoose';

export enum BookingStatus {
   ACTIVE = 'ACTIVE',
   CANCELLED = 'CANCELLED',
}

const bookingSchema = new Schema(
   {
      organizationId: {
         type: Schema.Types.ObjectId,
         ref: 'Organization',
         required: true,
         index: true,
      },

      resourceId: {
         type: Schema.Types.ObjectId,
         ref: 'Resource',
         required: true,
         index: true,
      },

      userId: {
         type: Schema.Types.ObjectId,
         ref: 'User',
         required: true,
         index: true,
      },

      startTime: {
         type: Date,
         required: true,
      },

      endTime: {
         type: Date,
         required: true,
      },

      status: {
         type: String,
         enum: Object.values(BookingStatus),
         default: BookingStatus.ACTIVE,
      },
   },
   {
      timestamps: true,
   }
);

/*
Availability Query Optimization
*/
bookingSchema.index({
   resourceId: 1,
   startTime: 1,
   endTime: 1,
});

bookingSchema.index({
   organizationId: 1,
   resourceId: 1,
});

export const Booking = model('Booking', bookingSchema);
