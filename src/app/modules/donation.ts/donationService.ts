import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiErrors';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IPaginationOptions } from '../../../interfaces/pagination';
import {
  IDonationPost,
  IDonationPostCategory,
  IDonationPostFilters,
} from './donationInterface';
import { DonationPostCategoryModel, DonationPostModel } from './donationSchema';
import { donationSearchableFields } from './donationConstant';

const createDonationPost = async (payload: IDonationPost) => {
  const result = await DonationPostModel.create(payload);
  return result;
};
const getSingleDonationPost = async (id: string) => {
  const result = await DonationPostModel.findById(id);
  return result;
};
const getAllDonationPost = async (
  paginationOptions: IPaginationOptions,
  filters: IDonationPostFilters,
) => {
  const { searchTerm, ...filtersFields } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: donationSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  if (Object.keys(filtersFields).length) {
    andCondition.push({
      $and: Object.entries(filtersFields).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const result = await DonationPostModel.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await DonationPostModel.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const createDonationPostCategory = async (payload: IDonationPostCategory) => {
  const exist: IDonationPostCategory | null =
    await DonationPostCategoryModel.findOne({
      title: payload.title,
    });
  console.log(exist);
  if (exist?.title) {
    throw new ApiError(409, 'This already exist');
  }
  const result = await DonationPostCategoryModel.create(payload);
  return result;
};
const getSingleDonationPostCategory = async (id: string) => {
  const result = await DonationPostCategoryModel.findById(id);
  return result;
};
const getAllDonationPostCategory = async () => {
  const result = await DonationPostCategoryModel.find();
  return result;
};
export const DonationPostService = {
  createDonationPost,
  createDonationPostCategory,
  getSingleDonationPostCategory,
  getAllDonationPostCategory,
  getSingleDonationPost,
  getAllDonationPost,
};
