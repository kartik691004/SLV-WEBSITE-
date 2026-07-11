import { z } from 'zod';

export const createPropertySchema = z.object({
  body: z.object({
    title: z.string({ message: 'Title is required' }),
    description: z.string({ message: 'Description is required' }),
    price: z.preprocess((a) => Number(a), z.number().positive()),
    category: z.enum(['Rent', 'Lease', 'Sale', 'Buy'], { message: 'Category is required' }),
    location: z.string({ message: 'Location is required' }),
    address: z.string({ message: 'Address is required' }),
    bhk: z.string({ message: 'BHK is required' }),
    area: z.string({ message: 'Area is required' }),
    amenities: z.union([z.string(), z.array(z.string())]).optional(),
    status: z.enum(['Available', 'Booked Today', 'Sold']).optional(),
    isFeatured: z.preprocess((val) => val === 'true' || val === true, z.boolean().optional()),
  }),
});

export const updatePropertySchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    price: z.preprocess((a) => (a !== undefined ? Number(a) : undefined), z.number().positive().optional()),
    category: z.enum(['Rent', 'Lease', 'Sale', 'Buy']).optional(),
    location: z.string().optional(),
    address: z.string().optional(),
    bhk: z.string().optional(),
    area: z.string().optional(),
    amenities: z.union([z.string(), z.array(z.string())]).optional(),
    status: z.enum(['Available', 'Booked Today', 'Sold']).optional(),
    isFeatured: z.preprocess((val) => (val !== undefined ? val === 'true' || val === true : undefined), z.boolean().optional()),
  }),
});
