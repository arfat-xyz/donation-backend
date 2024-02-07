import { Request, Response } from 'express';
import catchAsync from '../../../Shared/cacheAsync';
import { IDonationPost, IDonationPostCategory } from './donationInterface';
import { DonationPostService } from './donationService';
import sendResponse from '../../../Shared/sentResponse';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import pick from '../../../Shared/pick';
import { docationFilterableFields } from './donationConstant';

const createDonationPost = catchAsync(async (req: Request, res: Response) => {
  const payload: IDonationPost = req.body;
  const result = await DonationPostService.createDonationPost(payload);
  sendResponse<IDonationPost>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Create created successfully.`,
    data: result,
  });
});
const getSingleDonationPost = catchAsync(
  async (req: Request, res: Response) => {
    const result = await DonationPostService.getSingleDonationPost(
      req.params.id,
    );
    sendResponse<IDonationPost>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Create created successfully.`,
      data: result,
    });
  },
);
const getAllDonationPost = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, docationFilterableFields);
  const result = await DonationPostService.getAllDonationPost(
    paginationOptions,
    filters,
  );
  sendResponse<IDonationPost[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Create created successfully.`,
    meta: result.meta,
    data: result.data,
  });
});

const createDonationPostCategory = catchAsync(
  async (req: Request, res: Response) => {
    const payload: IDonationPostCategory = req.body;
    const result = await DonationPostService.createDonationPostCategory(
      payload,
    );
    sendResponse<IDonationPostCategory>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Create created successfully.`,
      data: result,
    });
  },
);
const getSingleDonationPostCategory = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await DonationPostService.getSingleDonationPostCategory(id);
    sendResponse<IDonationPostCategory>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Create created successfully.`,
      data: result,
    });
  },
);
const getAllDonationPostCategory = catchAsync(
  async (req: Request, res: Response) => {
    const result = await DonationPostService.getAllDonationPostCategory();
    sendResponse<IDonationPostCategory[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Create created successfully.`,
      data: result,
    });
  },
);
export const DonationPostController = {
  createDonationPost,
  createDonationPostCategory,
  getSingleDonationPostCategory,
  getAllDonationPostCategory,
  getSingleDonationPost,
  getAllDonationPost,
};
