import { NextFunction, Response } from 'express';

import { AuthenticatedRequestBody, IUser } from '@src/interfaces';
import {
  ConfirmPaymentPayload,
  adminConfirmPaymentService,
  getAllTransactionsService,
  getMyTransactionsService,
} from '@src/services/transaction.service';

export const confirmPaymentController = (
  req: AuthenticatedRequestBody<IUser & ConfirmPaymentPayload>,
  res: Response,
  next: NextFunction
) =>
  adminConfirmPaymentService(req, res, next);

export const getMyTransactionsController = (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) =>
  getMyTransactionsService(req, res, next);

export const getAllTransactionsController = (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) =>
  getAllTransactionsService(req, res, next);

export default getMyTransactionsController;

