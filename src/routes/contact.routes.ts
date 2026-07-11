import { Router } from 'express';
import * as contactController from '../controllers/contact.controller';
import { validate } from '../middlewares/validate.middleware';
import { createContactSchema } from '../validators/contact.validator';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Public route — anyone can send a message
router.post('/', validate(createContactSchema), contactController.createMessage);

// Protected routes (Admin only)
router.use(authenticate);
router.get('/', contactController.getAllMessages);
router.put('/:id/read', contactController.markAsRead);
router.delete('/:id', contactController.deleteMessage);

export default router;
