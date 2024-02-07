import { z } from 'zod';

const createDonationPost = z.object({
  body: z.object({
    heading: z.string({
      required_error: 'Heading is required',
    }),
    details: z.string({
      required_error: 'Details is required',
    }),
    category: z.string({
      required_error: 'Category is required',
    }),
    image: z.string({
      required_error: 'Image is required',
    }),
  }),
});
const createDonationPostCategory = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});
export const DonationPostZod = {
  createDonationPost,
  createDonationPostCategory,
};
