import express from 'express';

import { getAllTransactionsController, getMyTransactionsController } from '@src/controllers';
import { isAdmin, isAuth } from '@src/middlewares';

const router = express.Router();

router.use(isAuth);
router.get('/', getMyTransactionsController);
router.get('/admin', isAdmin, getAllTransactionsController);

export = router;

