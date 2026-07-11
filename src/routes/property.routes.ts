import { Router } from 'express';
import * as propertyController from '../controllers/property.controller';
import { validate } from '../middlewares/validate.middleware';
import { createPropertySchema, updatePropertySchema } from '../validators/property.validator';
import { authenticate } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/upload.middleware';

const router = Router();

// Public routes
router.get('/public', propertyController.getProperties);
router.get('/public/:idOrSlug', propertyController.getProperty);

// Protected routes (Admin)
router.use(authenticate);
router.post('/', upload.fields([{ name: 'images', maxCount: 15 }, { name: 'videos', maxCount: 6 }]), validate(createPropertySchema), propertyController.createProperty);
router.get('/', propertyController.getProperties);
router.get('/:idOrSlug', propertyController.getProperty);
router.put('/:id', upload.fields([{ name: 'images', maxCount: 15 }, { name: 'videos', maxCount: 6 }]), validate(updatePropertySchema), propertyController.updateProperty);
router.delete('/:id', propertyController.deleteProperty);

export default router;
