import { z } from 'zod';

export const createResourceSchema = z.object({
   body: z.object({
      resourceId: z.string().min(1, 'Resource ID is required'),
      startTime: z.string().min(1),
      endTime: z.string().min(1),
   }),
});
