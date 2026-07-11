import { Router } from 'express';
import * as reviewController from '../controllers/review.controller';
import { validate } from '../middlewares/validate.middleware';
import { createReviewSchema } from '../validators/review.validator';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Public routes
router.get('/public', reviewController.getPublicReviews);
router.post('/', validate(createReviewSchema), reviewController.createReview);

// Protected routes (Admin)
router.use(authenticate);
router.get('/', reviewController.getAllReviews);
router.put('/:id/approve', reviewController.updateReviewStatus);
router.delete('/:id', reviewController.deleteReview);

export default router;
