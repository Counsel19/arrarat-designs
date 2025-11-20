import express from 'express';

import { getPublicSettingsController, getSettingsController, updateAdminContactController } from '@src/controllers';
import { isAdmin, isAuth } from '@src/middlewares';

const router = express.Router();

router.get('/public', getPublicSettingsController);

router.use(isAuth, isAdmin);
router.get('/', getSettingsController);
router.patch('/', updateAdminContactController);

export = router;

