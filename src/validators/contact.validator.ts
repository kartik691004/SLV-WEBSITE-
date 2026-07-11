import { z } from 'zod';

export const createContactSchema = z.object({
  body: z.object({
    name: z.string({ message: 'Name is required' }),
    message: z.string({ message: 'Message is required' }),
    phone: z.string().optional(),
    email: z.string().optional(),
  }),
});
