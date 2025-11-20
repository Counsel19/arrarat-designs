import { NextFunction, Response } from 'express';

import { AuthenticatedRequestBody, IUser } from '@src/interfaces';
import { addWishlistItemService, getWishlistService, removeWishlistItemService } from '@src/services';

export const getWishlistController = (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) =>
  getWishlistService(req, res, next);

export const addWishlistItemController = (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) =>
  addWishlistItemService(req, res, next);

export const removeWishlistItemController = (
  req: AuthenticatedRequestBody<IUser>,
  res: Response,
  next: NextFunction
) => removeWishlistItemService(req, res, next);

export default getWishlistController;

