import express from 'express';

import healthCheckRoute from '@src/routes/healthCheck.route';
import homeRoute from '@src/routes/home.route';
import authRoutes from '@src/routes/auth.route';
import userRoutes from '@src/routes/user.route';
import adminRoutes from '@src/routes/admin.route';
import productRoutes from '@src/routes/product.route';
import orderRoutes from '@src/routes/order.route';
import cartRoutes from '@src/routes/cart.route';
import pdfServeRoute from '@src/routes/pdfDoc.route';
import categoryRoutes from '@src/routes/category.route';
import settingsRoute from '@src/routes/settings.route';
import transactionRoute from '@src/routes/transaction.route';
import wishlistRoute from '@src/routes/wishlist.route';
import contactRoute from '@src/routes/contact.route';
import faqRoute from '@src/routes/faq.route';
import analyticsRoute from '@src/routes/analytics.route';

const router = express.Router();

router.use('/', homeRoute);
router.use('/pdf-test', pdfServeRoute);
router.use('/healthChecker', healthCheckRoute);
router.use('/admin', adminRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/categories', categoryRoutes);
router.use('/settings', settingsRoute);
router.use('/transactions', transactionRoute);
router.use('/wishlist', wishlistRoute);
router.use('/contact', contactRoute);
router.use('/faqs', faqRoute);
router.use('/analytics', analyticsRoute);

export default router;
