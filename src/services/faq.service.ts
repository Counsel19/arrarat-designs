import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { Error } from 'mongoose';

import { AuthenticatedRequestBody, FAQT, IUser } from '@src/interfaces';
import { customResponse } from '@src/utils';
import FAQ from '@src/models/FAQ.model';

// Get all active FAQs (public endpoint)
export const getFAQsService = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const faqs = await FAQ.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .exec();

    return res.status(200).send(
      customResponse({
        success: true,
        error: false,
        status: 200,
        message: 'FAQs fetched successfully',
        data: { faqs: faqs || [] },
      })
    );
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    next(createHttpError(500, 'Failed to fetch FAQs'));
  }
};

// Get all FAQs for admin (includes inactive)
export const getAllFAQsService = async (
  req: AuthenticatedRequestBody<IUser>,
  res: Response,
  next: NextFunction
) => {
  try {
    const faqs = await FAQ.find()
      .sort({ order: 1, createdAt: -1 })
      .populate('createdBy', 'name email')
      .exec();

    return res.status(200).send(
      customResponse({
        success: true,
        error: false,
        status: 200,
        message: 'FAQs fetched successfully',
        data: { faqs: faqs || [] },
      })
    );
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    next(createHttpError(500, 'Failed to fetch FAQs'));
  }
};

// Create FAQ (admin only)
export const createFAQService = async (
  req: AuthenticatedRequestBody<IUser & FAQT>,
  res: Response,
  next: NextFunction
) => {
  const { question, answer, category, order, isActive } = req.body;

  try {
    const faqData = new FAQ({
      question,
      answer,
      category,
      order: order || 0,
      isActive: isActive !== undefined ? isActive : true,
      createdBy: req.user?._id,
    });

    const createdFAQ = await FAQ.create(faqData);
    await createdFAQ.populate('createdBy', 'name email');

    return res.status(201).send(
      customResponse({
        success: true,
        error: false,
        status: 201,
        message: 'FAQ created successfully',
        data: { faq: createdFAQ },
      })
    );
  } catch (error) {
    console.error('Error creating FAQ:', error);

    if (error instanceof Error.ValidationError) {
      const errorMessages = Object.values(error.errors).map((err) => err.message);
      const fullErrorMessage = errorMessages.join(' | ');
      next(createHttpError(400, fullErrorMessage));
    } else {
      next(createHttpError(500, 'Failed to create FAQ'));
    }
  }
};

// Update FAQ (admin only)
export const updateFAQService = async (
  req: AuthenticatedRequestBody<IUser & FAQT>,
  res: Response,
  next: NextFunction
) => {
  const { faqId } = req.params;
  const { question, answer, category, order, isActive } = req.body;

  try {
    const faq = await FAQ.findById(faqId);
    if (!faq) {
      return next(createHttpError(404, 'FAQ not found'));
    }

    if (question) faq.question = question;
    if (answer) faq.answer = answer;
    if (category !== undefined) faq.category = category;
    if (order !== undefined) faq.order = order;
    if (isActive !== undefined) faq.isActive = isActive;

    const updatedFAQ = await faq.save();
    await updatedFAQ.populate('createdBy', 'name email');

    return res.status(200).send(
      customResponse({
        success: true,
        error: false,
        status: 200,
        message: 'FAQ updated successfully',
        data: { faq: updatedFAQ },
      })
    );
  } catch (error) {
    console.error('Error updating FAQ:', error);

    if (error instanceof Error.ValidationError) {
      const errorMessages = Object.values(error.errors).map((err) => err.message);
      const fullErrorMessage = errorMessages.join(' | ');
      next(createHttpError(400, fullErrorMessage));
    } else {
      next(createHttpError(500, 'Failed to update FAQ'));
    }
  }
};

// Delete FAQ (admin only)
export const deleteFAQService = async (
  req: AuthenticatedRequestBody<IUser>,
  res: Response,
  next: NextFunction
) => {
  const { faqId } = req.params;

  try {
    const faq = await FAQ.findById(faqId);
    if (!faq) {
      return next(createHttpError(404, 'FAQ not found'));
    }

    await FAQ.findByIdAndDelete(faqId);

    return res.status(200).send(
      customResponse({
        success: true,
        error: false,
        status: 200,
        message: 'FAQ deleted successfully',
        data: {},
      })
    );
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    next(createHttpError(500, 'Failed to delete FAQ'));
  }
};

// Get single FAQ (admin)
export const getFAQService = async (
  req: AuthenticatedRequestBody<IUser>,
  res: Response,
  next: NextFunction
) => {
  const { faqId } = req.params;

  try {
    const faq = await FAQ.findById(faqId).populate('createdBy', 'name email').exec();
    if (!faq) {
      return next(createHttpError(404, 'FAQ not found'));
    }

    return res.status(200).send(
      customResponse({
        success: true,
        error: false,
        status: 200,
        message: 'FAQ fetched successfully',
        data: { faq },
      })
    );
  } catch (error) {
    console.error('Error fetching FAQ:', error);
    next(createHttpError(500, 'Failed to fetch FAQ'));
  }
};

