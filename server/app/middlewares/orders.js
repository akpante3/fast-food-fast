
import {
  allOrders,
  getOne,
  placeNewOrder,
} from './../controllers/orders';

/** Get all question
 * @param {object}
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

const getOneOrder = (req, res) => {
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

const postNewOrder = (req, res) => {
  placeNewOrder(req.body.orderId).then((order) => {
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


export {
  getAllOrders,
  getOneOrder,
  postNewOrder,
};
