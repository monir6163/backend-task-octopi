import { Router } from 'express';

import { auth } from '../../middleware/auth';
import { validateRequest } from '../../middleware/validateRequest';
import { ResourceController } from './resource.controller';
import { createResourceSchema } from './resource.validation';

const router = Router();

/**
 * CREATE RESOURCE
 */
router.post(
   '/',
   auth('ORG_ADMIN'),
   validateRequest(createResourceSchema),
   ResourceController.createResource
);

/**
 * GET ALL RESOURCES (ORG ONLY)
 */
router.get(
   '/',
   auth('ORG_ADMIN', 'EMPLOYEE'),
   ResourceController.getAllResources
);

/**
 * GET SINGLE RESOURCE
 */
router.get(
   '/:id',
   auth('ORG_ADMIN', 'EMPLOYEE'),
   ResourceController.getSingleResource
);

/**
 * UPDATE RESOURCE
 */
router.patch(
   '/:id',
   auth('ORG_ADMIN'),
   validateRequest(createResourceSchema),
   ResourceController.updateResource
);

/**
 * DELETE RESOURCE (SOFT DELETE)
 */
router.delete('/:id', auth('ORG_ADMIN'), ResourceController.deleteResource);

export const ResourceRoutes = router;
