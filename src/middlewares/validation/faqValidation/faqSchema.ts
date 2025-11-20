import Joi from 'joi';
// @ts-ignore
import JoiObjectId from 'joi-objectid';

const vaildObjectId = JoiObjectId(Joi);

export const faqSchema = {
  createFAQ: Joi.object({
    question: Joi.string().min(10).max(500).required().messages({
      'string.min': 'Question must be at least 10 characters long',
      'string.max': 'Question cannot exceed 500 characters',
      'any.required': 'Question is required',
    }),
    answer: Joi.string().min(10).required().messages({
      'string.min': 'Answer must be at least 10 characters long',
      'any.required': 'Answer is required',
    }),
    category: Joi.string().optional().allow('', null),
    order: Joi.number().integer().min(0).optional(),
    isActive: Joi.boolean().optional(),
  }),
  updateFAQ: Joi.object({
    question: Joi.string().min(10).max(500).optional(),
    answer: Joi.string().min(10).optional(),
    category: Joi.string().optional().allow('', null),
    order: Joi.number().integer().min(0).optional(),
    isActive: Joi.boolean().optional(),
  }),
  validatedFAQId: Joi.object({
    faqId: vaildObjectId().required(),
  }),
};

export default faqSchema;

