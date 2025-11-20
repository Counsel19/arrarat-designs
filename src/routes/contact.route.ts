import express from 'express';

import { createContactController } from '@src/controllers';
import { createContactValidation } from '@src/middlewares';

const router = express.Router();

// Public endpoint - anyone can submit a contact form
router.post('/', createContactValidation, createContactController);

export = router;

