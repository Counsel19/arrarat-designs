import express from 'express';

import { addWishlistItemController, getWishlistController, removeWishlistItemController } from '@src/controllers';
import { isAuth, productIdValidation } from '@src/middlewares';

const router = express.Router();

router.use(isAuth);
router.get('/', getWishlistController);
router.post('/:productId', productIdValidation, addWishlistItemController);
router.delete('/:productId', productIdValidation, removeWishlistItemController);

export = router;

