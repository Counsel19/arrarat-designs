import { Request, Response, NextFunction } from 'express';

import {
  getDashboardStatsService,
  getRevenueTrendsService,
  getOrdersByLocationService,
  getOrdersByStatusService,
  getTopProductsService,
} from '@src/services/analytics.service';
import { AuthenticatedRequestBody, IUser } from '@src/interfaces';

export const getDashboardStatsController = (
  req: AuthenticatedRequestBody<IUser>,
  res: Response,
  next: NextFunction
) => getDashboardStatsService(req, res, next);

export const getRevenueTrendsController = (
  req: AuthenticatedRequestBody<IUser>,
  res: Response,
  next: NextFunction
) => getRevenueTrendsService(req, res, next);

export const getOrdersByLocationController = (
  req: AuthenticatedRequestBody<IUser>,
  res: Response,
  next: NextFunction
) => getOrdersByLocationService(req, res, next);

export const getOrdersByStatusController = (
  req: AuthenticatedRequestBody<IUser>,
  res: Response,
  next: NextFunction
) => getOrdersByStatusService(req, res, next);

export const getTopProductsController = (
  req: AuthenticatedRequestBody<IUser>,
  res: Response,
  next: NextFunction
) => getTopProductsService(req, res, next);

