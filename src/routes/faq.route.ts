import express from 'express';

import {
  createFAQController,
  deleteFAQController,
  getAllFAQsController,
  getFAQController,
  getFAQsController,
  updateFAQController,
} from '@src/controllers';
import { isAdmin, isAuth, createFAQValidation, updateFAQValidation, faqIdValidation } from '@src/middlewares';

const router = express.Router();

// Public endpoint - get all active FAQs
router.get('/', getFAQsController);

// Admin endpoints - CRUD operations for FAQs (requires authentication and admin role)
router.get('/admin/all', isAuth, isAdmin, getAllFAQsController);
router.get('/admin/:faqId', isAuth, isAdmin, faqIdValidation, getFAQController);
router.post('/admin', isAuth, isAdmin, createFAQValidation, createFAQController);
router.put('/admin/:faqId', isAuth, isAdmin, faqIdValidation, updateFAQValidation, updateFAQController);
router.delete('/admin/:faqId', isAuth, isAdmin, faqIdValidation, deleteFAQController);

export = router;

