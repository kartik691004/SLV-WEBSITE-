import { z } from 'zod';

export const createScheduleSchema = z.object({
  body: z.object({
    customerName: z.string({ message: 'Customer name is required' }),
    phoneNumber: z.string({ message: 'Phone number is required' }),
    propertyId: z.string({ message: 'Property ID is required' }),
    preferredDate: z.string({ message: 'Preferred date is required' }),
    preferredTime: z.string({ message: 'Preferred time is required' }),
    message: z.string().optional(),
  }),
});

export const updateScheduleStatusSchema = z.object({
  body: z.object({
    status: z.enum(['Pending', 'Contacted', 'Completed'], { message: 'Status is required' }),
  }),
});
