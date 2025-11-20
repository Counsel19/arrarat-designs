import { NextFunction, Response } from 'express';
import createHttpError, { InternalServerError } from 'http-errors';
import { IAuthRequest } from '@src/interfaces';

export const customRoles = (authorizationEmails: string | undefined, role: string) => {
  return async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
      const user = req?.user;

      if (!user) {
        return next(createHttpError(403, `Auth Failed (Unauthorized - No user found)`));
      }

      let parsedAuthorizationEmails: string[] | undefined;
      try {
        parsedAuthorizationEmails = authorizationEmails ? (JSON.parse(authorizationEmails) as string[]) : undefined;
      } catch (parseError) {
        console.error('Error parsing authorizationEmails:', parseError);
        parsedAuthorizationEmails = undefined;
      }

      // Check if user has the required role
      // Normalize role comparison (case-insensitive, trim whitespace)
      const userRole = String(user.role || '').toLowerCase().trim();
      const requiredRole = String(role || '').toLowerCase().trim();
      const hasCorrectRole = userRole === requiredRole;

      // Check if email is in the authorization list (if provided)
      const isEmailInList = parsedAuthorizationEmails?.some(email => 
        email.toLowerCase().trim() === String(user?.email || '').toLowerCase().trim()
      );

      // User is authorized if:
      // 1. They have the correct role (role-based access takes priority), OR
      // 2. Their email is in the authorization list (email-based fallback if no role)
      // This allows flexibility: role-based OR email-based access
      const isAuth = hasCorrectRole || (parsedAuthorizationEmails && parsedAuthorizationEmails.length > 0 && isEmailInList);
      
      // Debug logging
      if (!isAuth) {
        console.log('Authorization check details:', {
          userId: user._id,
          userEmail: user.email,
          userRole: user.role,
          userRoleNormalized: userRole,
          requiredRole: role,
          requiredRoleNormalized: requiredRole,
          hasCorrectRole,
          parsedAuthorizationEmails,
          isEmailInList,
          authorizationEmails
        });
      }

      if (!isAuth) {
        console.error('Custom role access denied:', {
          userId: user._id,
          email: user.email,
          userRole: user.role,
          requiredRole: role,
          isEmailInList: isEmailInList,
          authorizationEmails: parsedAuthorizationEmails
        });
        return next(createHttpError(403, `Auth Failed (Unauthorized - ${role} access required)`));
      }
      next();
    } catch (error) {
      console.error('Error in customRoles middleware:', error);
      next(InternalServerError);
    }
  };
};
