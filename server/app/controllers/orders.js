import { menuDb, newfoodDb, postOrdersDb, getAllDb, getOneDb, userOrdersDb, statusDb } from '../db/ordersDb';
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
 *  @param {string} username
 * @return {obj} new food
 * @public
*/
const newFood = (food, username) => {
  return newfoodDb(food, username).then((data) => {
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
  }).catch(() => {
    return Promise.reject();
  });
};
/**  Get one order
 * @param {string} username
 * @return {obj} order data
 * @public
*/
const getAll = (username) => {
  if (!(username === 'foodamin')) {
    return Promise.reject(new Error('this Feature is only avaliable to the admin'));
  }
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
 * @return {obj} order data
 * @public
*/
const userOrders = (id) => {
  return userOrdersDb(id).then((data) => {
    return Promise.resolve(data);
  }).catch((error) => {
    return Promise.reject(error.message);
  });
};
/** PUT update status
 * @param {string} orderId
 * @param {string} statusUpdate
 * @return {obj} order data
 * @public
*/
const status = (orderId, statusUpdate) => {
  const id = parseInt(orderId, 10);

  if (!(statusUpdate === 'completed' || statusUpdate === 'accepted' || statusUpdate === 'declined')) {
    return Promise.reject(new Error('invalid status update, status should be completed, accepted or declined'));
  }
  return statusDb(id, statusUpdate).then((data) => {
    return Promise.resolve(data);
  }).catch((error) => {
    return Promise.reject(error.message);
  });
};
export { menu, newFood, postOrders, getOne, getAll, userOrders, status };
