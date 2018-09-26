import express from 'express';
import { authenticate } from '../middlewares/auth';
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
ordersRoutes.post('/menu', authenticate, postFood);
ordersRoutes.get('/orders', authenticate, allOrders);
ordersRoutes.post('/orders', authenticate, newOrder);
ordersRoutes.get('/orders/:id', authenticate, anOrder);
ordersRoutes.put('/orders/:id', authenticate, statusUpdate);
ordersRoutes.get('/orders/:userId/orders', authenticate, getUserOrders);

export default ordersRoutes;
