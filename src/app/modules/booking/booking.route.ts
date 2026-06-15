import { Router } from 'express';

import { auth } from '../../middleware/auth';
import { validateRequest } from '../../middleware/validateRequest';
import { BookingController } from './booking.controller';
import { createBookingSchema } from './booking.validation';

const router = Router();

/**
 * CREATE BOOKING
 */
router.post(
   '/',
   auth('ORG_ADMIN', 'EMPLOYEE'),
   validateRequest(createBookingSchema),
   BookingController.createBooking
);

/**
 * GET BOOKINGS
 */
router.get('/', auth('ORG_ADMIN', 'EMPLOYEE'), BookingController.getBookings);

/**
 * CANCEL BOOKING
 */
router.delete(
   '/:id',
   auth('ORG_ADMIN', 'EMPLOYEE'),
   BookingController.cancelBooking
);

export const BookingRoutes = router;
