import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { Application } from 'express';
import allRoutes from './app/routes/index';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
const app: Application = express();
app.use(cors());
// parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use('/api/v1/', allRoutes);
app.use(globalErrorHandler);

// Handle Route not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API not found',
      },
    ],
  });
  next();
});
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to my Database');
});

export default app;
