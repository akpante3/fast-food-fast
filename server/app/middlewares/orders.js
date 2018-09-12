
import {
  allOrders,
  getOne,
  placeNewOrder,
  updateOrder,
} from './../controllers/orders';

/** Get all Orders
 * @param {strings}
 * @return {object}
 * @public
*/
const getAllOrders = (req, res) => {
  allOrders().then((orders) => {
    res.send({
      status: 'success',
      message: 'orders were fetched succcessfully',
      data: orders,
    });
  }).catch(() => res.status(404).send({
    status: 'failure',
    message: 'Orders were not found',
  }));
};
/** Get one  order
 * @param {strings}
 * @return {object}
 * @public
*/
const getOneOrder = (req, res) => {
  if (!req.params.id) {
    res.status(404).send({
      status: 'failure',
      message: 'id was not found,please input id',
    });
  }
  getOne(req.params.id).then((order) => {
    res.send({
      status: 'success',
      message: 'order was succcessfully fetched',
      data: order,
    });
  }).catch(() => {
    res.status(404).send({
      status: 'failure',
      message: 'Order was not found',
    });
  });
};
/** post New order
 * @param {strings}
 * @return {object}
 * @public
*/
const postNewOrder = (req, res) => {
  if (!req.body.foodId) {
    res.status(404).send({
      status: 'failure',
      message: 'foodId  was not found,please input foodId',
    });
  }
  placeNewOrder(req.body.foodId).then((order) => {
    res.send({
      status: 'success',
      message: 'order was placed succcessfully',
      data: order,
    });
  }).catch(() => {
    res.status(404).send({
      status: 'failure',
      message: 'There was an error placing this order',
    });
  });
};
/** Update order status
 * @param {strings}
 * @return {object}
 * @public
*/
const orderUpdate = (req, res) => {
  if (!req.body.status) {
    res.status(404).send({
      status: 'failure',
      message: 'status was not found,please input status',
    });
  }
  updateOrder(req.params.id, req.body.status).then((order) => {
    res.send({
      status: 'success',
      message: 'order was updated succcessfully',
      data: order,
    });
  }).catch(() => {
    res.status(404).send({
      status: 'failure',
      message: 'order was not found',
    });
  });
};


export {
  getAllOrders,
  getOneOrder,
  postNewOrder,
  orderUpdate,
};
