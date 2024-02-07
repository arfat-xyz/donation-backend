import { Schema, model } from 'mongoose';
import {
  IDonationPost,
  IDonationPostCategory,
  IDonationPostCategoryModel,
  IDonationPostModel,
} from './donationInterface';
const donationPostSchema = new Schema<IDonationPost>(
  {
    heading: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    totalCollection: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);
const categorySchema = new Schema<IDonationPostCategory>(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
export const DonationPostModel = model<IDonationPost, IDonationPostModel>(
  'donation',
  donationPostSchema,
);
export const DonationPostCategoryModel = model<
  IDonationPostCategory,
  IDonationPostCategoryModel
>('category', categorySchema);
