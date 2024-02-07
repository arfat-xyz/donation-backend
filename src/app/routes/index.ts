import { Router } from 'express';
import { UserRoutes } from '../modules/users/userRouter';
import { DonationPostRoutes } from '../modules/donation.ts/donationRouter';

const router = Router();
const modulesRoute = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/donation-post',
    route: DonationPostRoutes,
  },
];
modulesRoute.filter(mR => router.use(mR.path, mR.route));
export default router;
