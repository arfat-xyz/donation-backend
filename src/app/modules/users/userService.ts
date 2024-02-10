import { SortOrder } from 'mongoose';
import { userSearchableFields } from './userConstant';
import { IUser, IUserFilters } from './userInterface';
import { UserModel } from './userSchema';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IPaginationOptions } from '../../../interfaces/pagination';
import bcrypt from 'bcrypt';
import { JWTHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import ApiError from '../../../errors/ApiErrors';
const createUser = async (payload: IUser) => {
  const result = await UserModel.create(payload);
  // result.token = await bcrypt.compare(payload.password, savedPassord);
  const token = JWTHelpers.createToken(
    {
      name: result.name,
      email: result.email,
      image: result.image,
      _id: result._id,
      role: result.role,
    },
    config.jwt_secret!,
    config.jwt_expire!,
  );
  const { name, email, image, role, _id } = result;
  console.log(result, token);
  return { token, name, email, image, role, _id };
};
const updateUser = async (payload: Partial<IUser>, _id: string) => {
  const result = await UserModel.updateOne({ _id });

  return result;
};
const getSingleUser = async (_id: string) => {
  const result = await UserModel.findById(_id).select('-password');

  return result;
};
const loginUser = async (payload: IUser) => {
  const exist = await UserModel.findOne({ email: payload.email }).select([
    'name',
    'email',
    'password',
    'image',
    'role',
    '_id',
  ]);
  if (!exist) {
    throw new ApiError(401, 'Details not matched');
  }
  const { name, email, password, image, role, _id } = exist;
  const passMatched = await bcrypt.compare(payload.password, password);
  if (!passMatched) {
    throw new ApiError(401, "Password didn't match");
  }
  const token = JWTHelpers.createToken(
    {
      name: exist.name,
      email: exist.email,
      image: exist.image,
      _id: exist._id,
      role: exist.role,
    },
    config.jwt_secret!,
    config.jwt_expire!,
  );
  return { token, email, name, image, role, _id };
};

const getAllUsers = async (
  paginationOptions: IPaginationOptions,
  filters: IUserFilters,
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { searchTerm, ...filtersFields } = filters;
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: userSearchableFields.map(field => ({
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
  const result = await UserModel.find(whereCondition)
    .select('-password')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await UserModel.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
export const UserService = {
  createUser,
  getAllUsers,
  loginUser,
  updateUser,
  getSingleUser,
};
