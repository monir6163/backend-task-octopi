import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { AvailabilityRoutes } from '../modules/availability/availability.route';
import { BookingRoutes } from '../modules/booking/booking.route';
import { OrganizationRoutes } from '../modules/organization/organization.route';
import { ResourceRoutes } from '../modules/resource/resource.route';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
   // ... routes
   {
      path: '/user',
      routes: UserRoutes,
   },
   {
      path: '/auth',
      routes: AuthRoutes,
   },

   {
      path: '/organization',
      routes: OrganizationRoutes,
   },
   {
      path: '/resource',
      routes: ResourceRoutes,
   },
   {
      path: '/booking',
      routes: BookingRoutes,
   },

   {
      path: '/availability',
      routes: AvailabilityRoutes,
   },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
