import db from '../db/dbconnect';
/** place new Order
 * @param {string}  order avaliable food
 * @param {string} userId of order
 * @return {object} the new order and its properties
 * @public
*/
const placeNewOrder = (order, userId) => {
  const timeOrdered = new Date();
  const { orders } = order;

  if (!orders) return Promise.reject(new Error('no orders found, please post valid order'));
  const data = [];
  const items = orders.forEach((elem) => {
    db.one(`INSERT INTO orders (quantity, user_id, timeOrdered, foodID)
             VALUES($1, $2, $3, $4) RETURNING id, quantity, user_id, timeOrdered, foodID `, [elem.quantity, userId, timeOrdered, elem.foodID])
      .then(ordered => data.push(ordered));
  });

  if (!data.length === 0) {
    return Promise.resolve(items);
  }
};

export default placeNewOrder;
