import {
  Orders,
  menu,
} from '../db/dbconnect';


/** Get all Orders
 * @return {object} a list of all orders that have been made
 * @public
*/
const allOrders = () => Promise.resolve(Orders);

/** Get menu
 * @return {object} the list of avalaible food
*/
const allfood = () => Promise.resolve(menu);

/** Get an order
 * @param {number} id of particular order
 * @return {object} the order and its properties
*/
const getOne = (id) => {
  const orderId = parseInt(id, 10);
  const result = Orders.find(order => order.id === orderId);
  if (!result) {
    return Promise.reject();
  }
  return Promise.resolve(result);
};
/** place new Order
 * @param {string}  order avaliable food
 * @param {string} quantity of order
 * @return {object} the new order and its properties
 * @public
*/
const placeNewOrder = (order) => {
  const noFoodId = 'invalid order ID or quantity,please input valid values';
  const date = new Date();
  const { orders } = order;
  const decline = [];

  orders.forEach((elem) => {
    if (!elem.foodId || !elem.quantity) {
      decline.push(elem);
    }
    const orderId = parseInt(elem.foodId, 10);
    const item = menu.find(food => food.foodId === orderId);

    if (!item) {
      decline.push(elem);
    }
  });

  if (!(decline.length === 0)) {
    console.log(decline.length);
    return Promise.reject(noFoodId);
  }
  const neworder = {
    id: Orders.length + 1,
    timeOrdered: date,
    orders,
  };

  Orders.push(neworder);
  return Promise.resolve(neworder);
};

/** update Order
 * @param {string} paramsId of order
 * @param {string} status of order to be updated
 * @return {object} updated
 * @public
*/
const updateOrder = (paramsId, status) => {
  const noStatus = 'status was not found,please input status';
  const inValid = 'id is invalid,put a id Number';
  const invalidStatus = `status is invalid, input completed, accepted or 
  decline`;
  if (!status) {
    return Promise.reject(noStatus);
  }
  const orderId = parseInt(paramsId, 10);
  const result = Orders.find(order => order.id === orderId);
  if (!result) {
    return Promise.reject(inValid);
  }
  if (!(status === 'completed' || status === 'decline' || status === 'accepted')) {
    return Promise.reject(invalidStatus);
  }
  result.status = status;
  return Promise.resolve(result);
};

export {
  allOrders,
  getOne,
  placeNewOrder,
  updateOrder,
  allfood,
};
