import { Schema, model } from 'mongoose';

const organizationSchema = new Schema(
   {
      name: {
         type: String,
         required: true,
         trim: true,
      },

      timezone: {
         type: String,
         required: true,
         default: 'Asia/Dhaka',
      },

      isActive: {
         type: Boolean,
         default: true,
      },

      bookingConfig: {
         minDuration: {
            type: Number,
            default: 30,
         },

         maxDuration: {
            type: Number,
            default: 240,
         },

         advanceBookingDays: {
            type: Number,
            default: 30,
         },

         workingHours: {
            start: {
               type: String,
               default: '09:00',
            },

            end: {
               type: String,
               default: '18:00',
            },
         },
      },
   },
   {
      timestamps: true,
   }
);

export const Organization = model('Organization', organizationSchema);
