import { RequestHandler } from 'express';
import validator from '../validator';
import { faqSchema } from './faqSchema';

export const createFAQValidation: RequestHandler = (req, res, next) => {
  return validator(faqSchema.createFAQ, req.body, next);
};

export const updateFAQValidation: RequestHandler = (req, res, next) => {
  return validator(faqSchema.updateFAQ, req.body, next);
};

export const faqIdValidation: RequestHandler = (req, res, next) => {
  return validator(faqSchema.validatedFAQId, { ...req.body, ...req.params }, next);
};

export default createFAQValidation;

