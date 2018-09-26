import { db } from '../db/dbconnect';
import { validateEmail } from '../middlewares/auth';
/** Get menu
 * @return {obj} array of food
 * @public
*/
const menu = () => {
  return db.any('select * from menu')
    .then((data) => {
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
  if (!(username === 'foodamin')) {
    return Promise.reject(new Error('this Feature is only avaliable to the admin'));
  }
  return db.one(`INSERT INTO menu (food)
   VALUES($1) RETURNING foodId, food`, food)
    .then((data) => {
      return Promise.resolve(data);
    });
};
/**  POST an order
 * @param {string} ordered
 *@param {string} userId
 * @return {obj} an containing order details
 * @public
*/
const postOrders = (ordered, userId) => {
  const orderID = new Date().valueOf();
  const time = new Date();
  const date = time.getDate();
  const month = time.getMonth();
  const year = time.getFullYear();
  const timeOrdered = `${date} - ${month} - ${year}`;

  const {
    number,
    address,
    email,
    orders
  } = ordered;

  if (!number || !address || !validateEmail(email)) {
    return Promise.reject(new Error(`incomplete data, please input a
     valid email, address and number`));
  }

  return db.tx((data) => {
    return orders.forEach((order) => {
      data.one(
        `INSERT INTO orders(quantity,timeOrdered,foodId,address,email,orderid,userid,status )
      VALUES($1,$2,$3,$4,$5,$6,$7,$8) Returning orderid`,
        [order.quantity, timeOrdered, order.foodId, address, email, orderID, userId, 'null']
      );
    });
  }).then(() => {
    const details = {
      number,
      address,
      email,
      timeOrdered,
      orderID,
      userId,
      orders
    };
    return Promise.resolve(details);
  }).catch((error) => {
    return Promise.reject(error);
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
  return db.any('SELECT * FROM orders')
    .then((data) => {
      return Promise.resolve(data);
    });
};
/**  Get one order
 * @param {string} id
 * @return {obj} order data
 * @public
*/
const getOne = (id) => {
  return db.any(`SELECT * FROM orders
     WHERE orderID=$1`, id)
    .then((data) => {
      if (data.length === 0) {
        return Promise.reject();
      }
      return Promise.resolve(data);
    });
};
/**  Get all orders by user
 * @param {string} id
 * @return {obj} order data
 * @public
*/
const userOrders = (id) => {

  return db.any(`SELECT * FROM orders
     WHERE userid=$1`, id)
    .then((data) => {
      if (data.length === 0) {
        return Promise.reject(new Error('invalid request,No orders found with this id'));
      }
      return Promise.resolve(data);
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

  return db.one(`UPDATE orders SET status=$2
   WHERE orderid=$1`, [id, statusUpdate])
    .then(() => {
      return Promise.resolve('status was updated successfully');
    });
};
export { menu, newFood, postOrders, getOne, getAll, userOrders, status };
