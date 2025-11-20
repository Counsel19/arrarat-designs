import { NextFunction, Response, Request } from 'express';

import { ContactT } from '@src/interfaces';
import { createContactService } from '@src/services';

export const createContactController = (
  req: Request<{}, {}, ContactT>,
  res: Response,
  next: NextFunction
) => createContactService(req, res, next);

export default createContactController;

