import { z } from 'zod';

export const createBookingSchema = z.object({
   body: z.object({
      resourceId: z.string().min(1, 'ResourceId required'),
      startTime: z.string().min(1, 'Start time required'),
      endTime: z.string().min(1, 'End time required'),
   }),
});
