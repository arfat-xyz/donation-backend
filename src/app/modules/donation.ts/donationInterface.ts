import { Model } from 'mongoose';

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
