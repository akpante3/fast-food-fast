import express from 'express';

import {
  getAllOrders,
  getOneOrder,
  postNewOrder,
} from './../middlewares/orders';

const ordersRoutes = express.Router();

ordersRoutes.get('/orders', getAllOrders);
ordersRoutes.get('/orders/:id', getOneOrder);
ordersRoutes.post('/orders', postNewOrder);


export default ordersRoutes;
