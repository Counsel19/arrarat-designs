import Joi from 'joi';

// @ts-ignore
import JoiObjectId from 'joi-objectid';

const vaildObjectId = JoiObjectId(Joi);

export const categorySchema = {
  addCategory: Joi.object({
    filename: Joi.string().required().label('Invalid request (Please upload Image)'),
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(5).required(),
  }),
  updateCategory: Joi.object({
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(5).required(),
  }),
  validatedCategoryId: Joi.object({
    categoryId: vaildObjectId().required(),
  }),
};
