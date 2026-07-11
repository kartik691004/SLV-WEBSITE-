import { z } from 'zod';

export const createReviewSchema = z.object({
  body: z.object({
    customerName: z.string({ message: 'Customer name is required' }),
    rating: z.number({ message: 'Rating is required' }).min(1).max(5),
    message: z.string({ message: 'Message is required' }),
  }),
});
