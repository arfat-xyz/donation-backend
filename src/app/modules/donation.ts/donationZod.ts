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
const createUserDonation = z.object({
  body: z.object({
    user: z.string({
      required_error: 'User is required',
    }),
    donation: z.string({
      required_error: 'Donation is required',
    }),
    amount: z.string({
      required_error: 'Amount is required',
    }),
  }),
});
export const DonationPostZod = {
  createDonationPost,
  createDonationPostCategory,
  createUserDonation,
};
