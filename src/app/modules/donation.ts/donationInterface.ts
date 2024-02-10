import { Model, ObjectId } from 'mongoose';

export type IDonationPost = {
  heading: string;
  details: string;
  category: string;
  image: string;
  totalCollection: number;
};

export type IDonationPostCategory = {
  title: string;
};
export type IUserDonation = {
  donation: ObjectId;
  user: ObjectId;
  amount: number;
};
export type IUserDonationModel = Model<IUserDonation, Record<string, unknown>>;
export type IDonationPostModel = Model<IDonationPost, Record<string, unknown>>;
export type IDonationPostCategoryModel = Model<
  IDonationPostCategory,
  Record<string, unknown>
>;
export type IDonationPostFilters = {
  heading?: string;
  category?: string;
  searchTerm?: string;
};
