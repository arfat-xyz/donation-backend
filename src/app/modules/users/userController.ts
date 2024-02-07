import { Request, Response } from 'express';
import catchAsync from '../../../Shared/cacheAsync';
import { IUser } from './userInterface';
import httpStatus from 'http-status';
import sendResponse from '../../../Shared/sentResponse';
import { UserService } from './userService';
import { paginationFields } from '../../../constants/pagination';
import { userFilterableFields } from './userConstant';
import pick from '../../../Shared/pick';
import { UpdateWriteOpResult } from 'mongoose';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const payload: IUser = req.body;
  const result = await UserService.createUser(payload);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Create created successfully.`,
    data: result,
  });
});
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const result = await UserService.getSingleUser(id);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `data found successfully.`,
    data: result,
  });
});
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const payload: IUser = req.body;
  const _id = req.params.id;
  const result = await UserService.updateUser(payload, _id);
  sendResponse<UpdateWriteOpResult>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Updated successfully.`,
    data: result,
  });
});
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const payload: IUser = req.body;
  const result = await UserService.loginUser(payload);
  sendResponse<{ token: string }>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Create created successfully.`,
    data: result,
  });
});
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, userFilterableFields);
  const result = await UserService.getAllUsers(paginationOptions, filters);
  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Found successfully.`,
    meta: result.meta || null,
    data: result.data || null,
  });
});
export const UserController = {
  createUser,
  getAllUsers,
  loginUser,
  updateUser,
  getSingleUser,
};
