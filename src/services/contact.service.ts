import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { Error } from 'mongoose';

import { ContactT } from '@src/interfaces';
import { customResponse } from '@src/utils';
import Contact from '@src/models/Contact.model';

export const createContactService = async (
  req: Request<{}, {}, ContactT>,
  res: Response,
  next: NextFunction
) => {
  const { name, email, phone, subject, message } = req.body;

  try {
    const contactData = new Contact({
      name,
      email,
      phone,
      subject,
      message,
      status: 'new',
    });

    const createdContact = await Contact.create(contactData);

    return res.status(201).send(
      customResponse({
        success: true,
        error: false,
        status: 201,
        message: 'Contact message submitted successfully. We will get back to you soon!',
        data: {
          contact: createdContact,
        },
      })
    );
  } catch (error) {
    console.error('Error creating contact:', error);

    if (error instanceof Error.ValidationError) {
      const errorMessages = Object.values(error.errors).map((err) => err.message);
      const fullErrorMessage = errorMessages.join(' | ');
      next(createHttpError(400, fullErrorMessage));
    } else {
      next(createHttpError(500, 'Failed to submit contact message'));
    }
  }
};

