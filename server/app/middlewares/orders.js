import {
  allOrders,
  getOne,
  placeNewOrder,
  updateOrder,
  allfood,
} from './../controllers/orders';


/** Get menu
 * @param {string} req is the request parameter
 * @param {string} res is the response parameter
 * @return {object} the response object
 * @public
*/
const getAllOrders = (req, res) => {
  allOrders().then((orders) => {
    res.send({
      status: 'success',
      message: 'orders were fetched succcessfully',
      data: orders,
    });
  });
};
/** Get menu
 * @param {string} req is the request parameter
 * @param {string} res is the response parameter
 * @return {object} the response object
 * @public
*/
const getAllFood = (req, res) => {
  allfood().then((orders) => {
    res.send({
      status: 'success',
      message: 'orders were fetched succcessfully',
      data: orders,
    });
  });
};
/** Get menu
 * @param {string} req is the request parameter
 * @param {string} res is the response parameter
 * @return {object} the response object
 * @public
*/
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
/** Get menu
 * @param {string} req is the request parameter
 * @param {string} res is the response parameter
 * @return {object} the response object
 * @public
*/
const postNewOrder = (req, res) => {
  placeNewOrder(req.body.foodId, req.body.quantity).then((order) => {
    res.status(201).send({
      status: 'success',
      message: 'order was placed succcessfully',
      data: order,
    });
  }).catch((message) => {
    res.status(400).send({
      status: 'failure',
      message,
    });
  });
};
/** Get menu
 * @param {string} req is the request parameter
 * @param {string} res is the response parameter
 * @return {object} the response object
 * @public
*/
const orderUpdate = (req, res) => {
  updateOrder(req.params.id, req.body.status).then((order) => {
    res.status(200).send({
      status: 'success',
      message: 'order was updated succcessfully',
      data: order,
    });
  }).catch((message) => {
    res.status(400).send({
      status: 'failure',
      message,
    });
  });
};


export {
  getAllOrders,
  getOneOrder,
  postNewOrder,
  orderUpdate,
  getAllFood,
};
