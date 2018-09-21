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
 * @param {string} foodId of the avaliable food
 * @param {string} quantity of order
 * @return {object} the new order and its properties
 * @public
*/
const placeNewOrder = (foodId, quantity) => {
  const noFoodId = 'invalid order ID or quantity,please input valid values';
  const noResult = 'invalid order,please place a valid order';
  const date = new Date();

  if (!foodId || !quantity) {
    return Promise.reject(noFoodId);
  }
  const item = parseInt(foodId, 10);
  const itemQuantity = parseInt(quantity, 10);
  const result = menu.find(order => order.foodId === item);
  if (!result) {
    return Promise.reject(noResult);
  }
  const neworder = {
    food: result.food,
    foodId: result.foodId,
    id: Orders.length + 1,
    quantity: itemQuantity,
    timeOrdered: date,
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
