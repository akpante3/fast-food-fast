import express from 'express';
import { authenticate } from '../middlewares/auth';
import { getMenu, postFood, newOrder } from './../middlewares/orders';

const ordersRoutes = express.Router();

ordersRoutes.get('/menu', authenticate, getMenu);
ordersRoutes.post('/menu', authenticate, postFood);
ordersRoutes.post('/orders', authenticate, newOrder);

export default ordersRoutes;
