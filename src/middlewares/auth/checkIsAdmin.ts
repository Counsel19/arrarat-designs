import { NextFunction, Response } from 'express';
import createHttpError from 'http-errors';

import { environmentConfig } from '@src/configs/custom-environment-variables.config';
import { IAuthRequest as IAdminRequest } from '@src/interfaces';
import { authorizationRoles } from '@src/constants';

export const isAdmin = async (req: IAdminRequest, res: Response, next: NextFunction) => {
  const user = req?.user;

  if (!user) {
    return next(createHttpError(403, `Auth Failed (Unauthorized - No user found)`));
  }

  // Check if user has admin role in database
  const hasAdminRole = user.role === authorizationRoles.admin;

  // Also check if email is in ADMIN_EMAILS (if configured)
  const adminEmails = environmentConfig?.ADMIN_EMAILS && (JSON.parse(environmentConfig.ADMIN_EMAILS) as string[]);
  const isEmailInAdminList = adminEmails?.includes(`${user?.email}`);

  // User is admin if they have admin role OR their email is in ADMIN_EMAILS list
  // This allows flexibility: either role-based or email-based admin access
  const isAdminUser = hasAdminRole || isEmailInAdminList;

  if (!isAdminUser) {
    console.error('Admin access denied:', {
      userId: user._id,
      email: user.email,
      role: user.role,
      expectedRole: authorizationRoles.admin,
      isEmailInList: isEmailInAdminList,
      adminEmails: adminEmails
    });
    return next(createHttpError(403, `Auth Failed (Unauthorized - Admin access required)`));
  }

  next();
};

export default { isAdmin };
