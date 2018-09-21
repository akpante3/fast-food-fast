import express from 'express';
import { authenticate } from '../middlewares/auth';
import { getMenu } from './../middlewares/orders';

const ordersRoutes = express.Router();

ordersRoutes.get('/menu', authenticate, getMenu);

export default ordersRoutes;
