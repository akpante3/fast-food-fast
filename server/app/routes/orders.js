import express from 'express';
import { authenticate } from '../middlewares/auth';
import postNewOrder from './../middlewares/orders';

const ordersRoutes = express.Router();

ordersRoutes.post('/orders', authenticate, postNewOrder);

export default ordersRoutes;
