import { menu, newFood, postOrders } from './../controllers/orders';


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

export {
  getMenu,
  postFood,
  newOrder
};
