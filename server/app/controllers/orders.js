
import {
  Orders,
  menu,
} from '../db/dbconnect';


/** Get all Orders
 * @return {object}
 * @public
*/
const allOrders = () => {
  if (Orders.length !== 0) {
    return Promise.resolve(Orders);
  }
  return Promise.reject();
};

/** Get menu
 * @return {object}
 * @public
*/
const allfood = () => Promise.resolve(menu);

/** Get an order
 * @param {string}
 * @return {object}
 * @public
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
 * @param {string}
 * @return {object}
 * @public
*/
const placeNewOrder = (foodId, quantity) => {
  const noFoodId = 'foodId or quantity was not found';
  const noResult = 'order was not found,please place valid order';

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
  };
  Orders.push(neworder);
  return Promise.resolve(neworder);
};
/** update Order
 * @param {strings}
 * @return {object}
 * @public
*/
const updateOrder = (id, status) => {
  const notFound = 'order was not found';
  const noStatus = 'status was not found,please input status';
  if (!status) {
    return Promise.reject(noStatus);
  }
  const orderId = parseInt(id, 10);
  const result = Orders.find(order => order.id === orderId);
  if (!result) {
    return Promise.reject(notFound);
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
