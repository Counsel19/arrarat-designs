import Joi from 'joi';

export const contactSchema = {
  createContact: Joi.object({
    name: Joi.string().min(2).max(200).required().messages({
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name cannot exceed 200 characters',
      'any.required': 'Name is required',
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
    }),
    phone: Joi.string().optional().allow('', null),
    subject: Joi.string().min(3).max(200).required().messages({
      'string.min': 'Subject must be at least 3 characters long',
      'string.max': 'Subject cannot exceed 200 characters',
      'any.required': 'Subject is required',
    }),
    message: Joi.string().min(10).required().messages({
      'string.min': 'Message must be at least 10 characters long',
      'any.required': 'Message is required',
    }),
  }),
};

export default contactSchema;

