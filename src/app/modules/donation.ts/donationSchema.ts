import { Schema, model } from 'mongoose';
import {
  IDonationPost,
  IDonationPostCategory,
  IDonationPostCategoryModel,
  IDonationPostModel,
  IUserDonation,
  IUserDonationModel,
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
const userDonationSchema = new Schema<IUserDonation>(
  {
    donation: {
      type: Schema.Types.ObjectId,
      ref: 'donation',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    amount: {
      type: Number,
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
export const USerDonationModel = model<IUserDonation, IUserDonationModel>(
  'user-donation',
  userDonationSchema,
);
export const DonationPostCategoryModel = model<
  IDonationPostCategory,
  IDonationPostCategoryModel
>('category', categorySchema);
