import db from '../db/dbconnect';
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
    return Promise.reject(new Error(`this Feature is only avaliable to the admin`));
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
  const orderID = `000${new Date().valueOf()}`;
  const timeOrdered = new Date();
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

  orders.map((element) => {
    if (!element.quantity || !element.foodId ) {
      return Promise.reject(new Error('quantity or foodId not found,please insert'));
    }
    return db.one(
      `INSERT INTO orders (number, address, quantity, foodId, userId, timeOrdered)
      VALUES($1, $2, $3, $4, $5, $6, $7)`,
      [number, address, element.quantity, element.foodId, userId, timeOrdered]
    );
  });

  const data = {
    number,
    timeOrdered,
    address,
    orderID,
    orders,
  };
  return Promise.resolve(data);
};

export { menu, newFood, postOrders };
