import { NextFunction, Response, Request } from 'express';

import { AuthenticatedRequestBody, FAQT, IUser } from '@src/interfaces';
import {
  createFAQService,
  deleteFAQService,
  getAllFAQsService,
  getFAQService,
  getFAQsService,
  updateFAQService,
} from '@src/services';

export const getFAQsController = (req: Request, res: Response, next: NextFunction) =>
  getFAQsService(req, res, next);

export const getAllFAQsController = (
  req: AuthenticatedRequestBody<IUser>,
  res: Response,
  next: NextFunction
) => getAllFAQsService(req, res, next);

export const getFAQController = (
  req: AuthenticatedRequestBody<IUser>,
  res: Response,
  next: NextFunction
) => getFAQService(req, res, next);

export const createFAQController = (
  req: AuthenticatedRequestBody<IUser & FAQT>,
  res: Response,
  next: NextFunction
) => createFAQService(req, res, next);

export const updateFAQController = (
  req: AuthenticatedRequestBody<IUser & FAQT>,
  res: Response,
  next: NextFunction
) => updateFAQService(req, res, next);

export const deleteFAQController = (
  req: AuthenticatedRequestBody<IUser>,
  res: Response,
  next: NextFunction
) => deleteFAQService(req, res, next);

export default getFAQsController;

