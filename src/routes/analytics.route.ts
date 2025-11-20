import express from 'express';

import { isAuth, isAdmin } from '@src/middlewares';
import {
  getDashboardStatsController,
  getRevenueTrendsController,
  getOrdersByLocationController,
  getOrdersByStatusController,
  getTopProductsController,
} from '@src/controllers';

const router = express.Router();

// All analytics routes require admin authentication
router.use(isAuth, isAdmin);

router.get('/dashboard/stats', getDashboardStatsController);
router.get('/revenue/trends', getRevenueTrendsController);
router.get('/orders/location', getOrdersByLocationController);
router.get('/orders/status', getOrdersByStatusController);
router.get('/products/top', getTopProductsController);

export = router;

