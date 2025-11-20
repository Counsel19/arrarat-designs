import { NextFunction, Request, Response } from 'express';
import { AuthenticatedRequestBody, CategoryT, IUser, TPaginationResponse } from '@src/interfaces';
import {
  createCategoryService,
  deleteCategoryService,
  getCategoriesService,
  getCategoryService,
  updateCategoryService,
} from '@src/services/catgeory.service';

export const getCategoriesController = (req: Request, res: TPaginationResponse) => getCategoriesService(req, res);

export const getCategoryController = (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) =>
  getCategoryService(req, res, next);

export const createCategoryController = (req: AuthenticatedRequestBody<CategoryT>, res: Response, next: NextFunction) =>
  createCategoryService(req, res, next);

export const deleteCategoryController = (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) =>
  deleteCategoryService(req, res, next);

export const updateCategoryController = (req: AuthenticatedRequestBody<CategoryT>, res: Response, next: NextFunction) =>
  updateCategoryService(req, res, next);
