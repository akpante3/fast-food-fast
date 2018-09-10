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
  const noFoodId = 'foodId or quantity was not found';
  const noResult = 'order was not found,please place valid order';
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

const placeNewOrder = (foodId) => {
  const item = parseInt(foodId, 10);
  const result = food.find(order => order.foodId === item);
  if (!result) {
    return Promise.reject();
  }
  const neworder = {
    food: result.food,
    foodId: result.foodId,
    id: Orders.length + 1,
  };
  Orders.push(neworder);
  return Promise.resolve(neworder);
};

const updateOrder = (id, status) => {
  const orderId = parseInt(id, 10);
  const result = Orders.find(order => order.id === orderId);
  if (!result) {
    return Promise.reject();
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
