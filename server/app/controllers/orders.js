import db from '../db/dbconnect';
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
  if (!(username === 'foodamin')) return Promise.reject(new Error('this Feature is only avaliable to the admin'));
  return db.one(`INSERT INTO menu (food)
   VALUES($1) RETURNING foodId, food`, food)
    .then((data) => {
      return Promise.resolve(data);
    });
};

export { menu, newFood };

