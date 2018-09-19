import express from 'express';

import {
  getAllOrders,
  getOneOrder,
  postNewOrder,
  orderUpdate,
  getAllFood,
} from './../middlewares/orders';

const ordersRoutes = express.Router();

ordersRoutes.get('/menu', getAllFood);
ordersRoutes.get('/orders', getAllOrders);
ordersRoutes.get('/orders/:id', getOneOrder);
ordersRoutes.post('/orders', postNewOrder);
ordersRoutes.put('/orders/:id', orderUpdate);


export default ordersRoutes;
