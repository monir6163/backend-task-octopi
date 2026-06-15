import { z } from 'zod';

export const createOrganizationSchema = z.object({
   body: z.object({
      name: z.string().min(2),

      timezone: z.string(),

      bookingConfig: z.object({
         minDuration: z.number(),

         maxDuration: z.number(),

         advanceBookingDays: z.number(),

         workingHours: z.object({
            start: z.string(),
            end: z.string(),
         }),
      }),
   }),
});
