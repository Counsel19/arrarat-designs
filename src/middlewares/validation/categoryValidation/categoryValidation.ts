import { RequestHandler } from 'express';
import validator from '../validator';
import { categorySchema } from './categorySchema';

export const addCategoryValidation: RequestHandler = (req, res, next) => {
  return validator(
    categorySchema.addCategory,
    {
      ...req.file,
      ...req.body,
    },
    next
  );
};
export const updateCategoryValidation: RequestHandler = (req, res, next) =>
  validator(categorySchema.updateCategory, { ...req.file, ...req.body, ...req.params }, next);

export const categoryIdValidation: RequestHandler = (req, res, next) => {
  return validator(categorySchema.validatedCategoryId, { ...req.file, ...req.body, ...req.params }, next);
};
