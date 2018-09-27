import { menu, newFood, postOrders, getOne, getAll, userOrders, status } from './../controllers/orders';


/** Get menu
 * @param {string} req is the request parameter
 * @param {string} res is the response parameter
 * @return {object} the response object
 * @public
*/
const getMenu = (req, res) => {
  menu().then((menuList) => {
    res.send({
      status: 'success',
      message: 'menu was successfully fetched',
      data: menuList,
    });
  });
};

/** Post menu
 * @param {string} req is the request parameter
 * @param {string} res is the response parameter
 * @return {object} the response object
 * @public
*/
const postFood = (req, res) => {
  newFood(req.body.food, req.username).then((posted) => {
    res.status(201).send({
      status: 'success',
      message: 'food was posted successfully',
      data: posted,
    });
  }).catch((error) => {
    res.status(404).send({
      status: 'failure',
      message: error.message,
    });
  });
};

/** Post order
 * @param {string} req is the request parameter
 * @param {string} res is the response parameter
 * @return {object} the response object
 * @public
*/
const newOrder = (req, res) => {
  postOrders(req.body, req.userId).then((result) => {
    res.status(201).send({
      status: 'success',
      message: 'orders were posted succcessfully',
      data: result,
    });
  }).catch(() => res.status(400).send({
    status: 'failure',
    message: 'please input a valid order',
  }));
};

/** GET an order
 * @param {string} req is the request parameter
 * @param {string} res is the response parameter
 * @return {object} the response object
 * @public
*/
const anOrder = (req, res) => {
  getOne(req.params.id).then((order) => {
    res.send({
      status: 'success',
      message: 'order was succcessfully fetched',
      data: order,
    });
  }).catch(() => {
    res.status(404).send({
      status: 'failure',
      message: 'order  was not found',
    });
  });
};

/** GET all order
 * @param {string} req is the request parameter
 * @param {string} res is the response parameter
 * @return {object} the response object
 * @public
*/
const allOrders = (req, res) => {
  getAll(req.username).then((order) => {
    res.send({
      status: 'success',
      message: 'order was succcessfully fetched',
      data: order,
    });
  }).catch((error) => {
    res.status(404).send({
      status: 'failure',
      message: error.message
    });
  });
};
/** GET user orders
 * @param {string} req is the request parameter
 * @param {string} res is the response parameter
 * @return {object} the response object
 * @public
*/
const getUserOrders = (req, res) => {
  userOrders(req.params.userId).then((order) => {
    res.send({
      status: 'success',
      message: 'order was succcessfully fetched',
      data: order,
    });
  }).catch((error) => {
    res.status(404).send({
      status: 'failure',
      message: error.message,
    });
  });
};
/** GET user orders
 * @param {string} req is the request parameter
 * @param {string} res is the response parameter
 * @return {object} the response object
 * @public
*/
const statusUpdate = (req, res) => {
  status(req.params.id, req.body.status).then(() => {
    res.status(200).send({
      status: 'success',
      message: 'status was successfully accepted',
    });
  }).catch(() => res.status(404).send({
    status: 'failure',
    message: 'status was not updated',
  }));
};


export {
  getMenu,
  postFood,
  newOrder,
  anOrder,
  allOrders,
  getUserOrders,
  statusUpdate
};
