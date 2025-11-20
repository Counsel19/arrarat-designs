import { RequestHandler } from 'express';
import validator from '../validator';
import { contactSchema } from './contactSchema';

export const createContactValidation: RequestHandler = (req, res, next) => {
  return validator(contactSchema.createContact, req.body, next);
};

export default createContactValidation;

