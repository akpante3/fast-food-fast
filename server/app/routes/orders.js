import express from 'express';
import {
  authenticate,
  validateFoodId,
  foodAdmin,
  usersAccess,
  validatePostFood
} from '../middlewares/auth';
import {
  getMenu,
  postFood,
  newOrder,
  anOrder,
  allOrders,
  getUserOrders,
  statusUpdate
} from './../middlewares/orders';

const ordersRoutes = express.Router();

ordersRoutes.get('/menu', authenticate, getMenu);
ordersRoutes.post('/menu', authenticate, foodAdmin, validatePostFood, postFood);
ordersRoutes.get('/orders', authenticate, foodAdmin, allOrders);
ordersRoutes.post('/orders', authenticate, validateFoodId, newOrder);
ordersRoutes.get('/orders/:id', authenticate, foodAdmin, anOrder);
ordersRoutes.put('/orders/:id', authenticate, foodAdmin, statusUpdate);
ordersRoutes.get(
  '/orders/:userId/orders',
  authenticate,
  usersAccess,
  getUserOrders
);

export default ordersRoutes;
