import { Router } from 'express';
import * as scheduleController from '../controllers/schedule.controller';
import { validate } from '../middlewares/validate.middleware';
import { createScheduleSchema, updateScheduleStatusSchema } from '../validators/schedule.validator';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Public route
router.post('/', validate(createScheduleSchema), scheduleController.createScheduleRequest);

// Protected routes (Admin)
router.use(authenticate);
router.get('/', scheduleController.getScheduleRequests);
router.put('/:id/status', validate(updateScheduleStatusSchema), scheduleController.updateScheduleRequestStatus);
router.delete('/:id', scheduleController.deleteScheduleRequest);

export default router;
