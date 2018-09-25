import express from 'express';
import { authenticate } from '../middlewares/auth';
import { getMenu, postFood } from './../middlewares/orders';

const ordersRoutes = express.Router();

ordersRoutes.get('/menu', authenticate, getMenu);
ordersRoutes.post('/menu', authenticate, postFood);


export default ordersRoutes;
