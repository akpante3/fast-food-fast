import express from 'express';

import {
  getAllOrders,
  getOneOrder,
} from './../middlewares/orders';

const ordersRoutes = express.Router();

ordersRoutes.get('/orders', getAllOrders);
ordersRoutes.get('/orders/:id', getOneOrder);

export default ordersRoutes;
