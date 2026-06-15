import { Router } from 'express';

import { auth } from '../../middleware/auth';
import { OrganizationController } from './organization.controller';

const router = Router();

router.post('/', auth('ORG_ADMIN'), OrganizationController.createOrganization);

router.get(
   '/me',
   auth('ORG_ADMIN', 'EMPLOYEE'),
   OrganizationController.getMyOrganization
);

router.patch('/', auth('ORG_ADMIN'), OrganizationController.updateOrganization);

export const OrganizationRoutes = router;
