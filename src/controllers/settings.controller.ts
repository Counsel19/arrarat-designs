import { NextFunction, Request, Response } from 'express';

import { AuthenticatedRequestBody, IUser } from '@src/interfaces';
import { getPublicSettingsService, getSettingsService, updateAdminContactService } from '@src/services';

export const getPublicSettingsController = (req: Request, res: Response, next: NextFunction) =>
  getPublicSettingsService(req, res, next);

export const getSettingsController = (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) =>
  getSettingsService(req, res, next);

export const updateAdminContactController = (
  req: AuthenticatedRequestBody<IUser>,
  res: Response,
  next: NextFunction
) => updateAdminContactService(req, res, next);

export default getSettingsController;

