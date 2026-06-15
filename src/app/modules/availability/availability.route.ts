import { Router } from 'express';

import { auth } from '../../middleware/auth';
import { AvailabilityController } from './availability.controller';

const router = Router();

router.get(
   '/',
   auth('ORG_ADMIN', 'EMPLOYEE'),
   AvailabilityController.getAvailability
);

export const AvailabilityRoutes = router;
