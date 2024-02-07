import { Router } from 'express';
import zodValidateRequest from '../../middlewares/zodValidateRequest';
import { DonationPostController } from './donationController';
import { DonationPostZod } from './donationZod';

const router = Router();
router.post(
  '/post',
  zodValidateRequest(DonationPostZod.createDonationPost),
  DonationPostController.createDonationPost,
);
router.get('/post/:id', DonationPostController.getSingleDonationPost);
router.delete('/post/:id', DonationPostController.deleteDonationPost);
router.get('/post/', DonationPostController.getAllDonationPost);
router.post(
  '/category',
  zodValidateRequest(DonationPostZod.createDonationPostCategory),
  DonationPostController.createDonationPostCategory,
);
router.get('/category', DonationPostController.getAllDonationPostCategory);
router.get(
  '/category/:id',
  DonationPostController.getSingleDonationPostCategory,
);

export const DonationPostRoutes = router;
