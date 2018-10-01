import {
  menuDb,
  newfoodDb,
  postOrdersDb,
  getAllDb,
  getOneDb,
  userOrdersDb,
  statusDb
} from '../db/ordersDb';
/** Get menu
 * @return {obj} array of food
 * @public
*/
const menu = () => {
  return menuDb().then((data) => {
    return Promise.resolve(data);
  });
};

/**  POST new  food
 *  @param {string} food
 *  @param {string} price
 * @param {string} username
 * @return {obj} new food
 * @public
*/
const newFood = (food, price) => {
  return newfoodDb(food, price).then((data) => {
    return Promise.resolve(data);
  });
};
/**  POST an order
 * @param {string} ordered
 * @param {string} userId
 * @return {obj} an containing order details
 * @public
*/
const postOrders = (ordered, userId) => {
  return postOrdersDb(ordered, userId).then((data) => {
    return Promise.resolve(data);
  }).catch((data) => {
    return Promise.reject(data);
  });
};
/**  Get all order
 * @param {string} username
 * @return {obj} order data
 * @public
*/
const getAll = (username) => {
  return getAllDb(username).then((data) => {
    return Promise.resolve(data);
  });
};
/**  Get one order
 * @param {string} id
 * @return {obj} order data
 * @public
*/
const getOne = (id) => {
  return getOneDb(id).then((data) => {
    return Promise.resolve(data);
  }).catch(() => {
    return Promise.reject();
  });
};
/**  Get all orders by user
 * @param {string} id
 * @param {string} userid
 * @return {obj} order data
 * @public
*/
const userOrders = (id) => {
  return userOrdersDb(id).then((data) => {
    return Promise.resolve(data);
  }).catch(() => {
    return Promise.reject();
  });
};
/** PUT update status
 * @param {string} orderId
 * @param {string} statusUpdate
 * @return {obj} order data
 * @public
*/
const status = (orderId, statusUpdate) => {
  const reject = 'order was not updated';
  if (!(statusUpdate === 'completed' || statusUpdate === 'accepted' || statusUpdate === 'declined' || !statusUpdate)) {
    return Promise.reject(new Error('invalid status update, status should be completed, accepted or declined'));
  }
  return statusDb(orderId, statusUpdate).then((data) => {
    return Promise.resolve(data);
  }).catch(() => {
    return Promise.reject(reject);
  });
};
export { menu, newFood, postOrders, getOne, getAll, userOrders, status };
