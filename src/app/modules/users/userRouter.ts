import { Router } from 'express';
import { UserController } from './userController';
import zodValidateRequest from '../../middlewares/zodValidateRequest';
import { UserZodSchema } from './userZod';

const router = Router();
router
  .route('/')
  .post(zodValidateRequest(UserZodSchema.createUser), UserController.createUser)
  .get(UserController.getAllUsers);
router
  .route('/:id')
  .put(zodValidateRequest(UserZodSchema.updateUser), UserController.updateUser)
  .get(UserController.getSingleUser);
router.post('/login', UserController.loginUser);
export const UserRoutes = router;
