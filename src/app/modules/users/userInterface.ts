import { Model } from 'mongoose';

export type IUser = {
  name: string;
  token?: string;
  email: string;
  password: string;
  image: string;
};

export type IUserModel = Model<IUser, Record<string, unknown>>;
export type IUserFilters = {
  name?: string;
  email?: string;
  searchTerm?: string;
};
