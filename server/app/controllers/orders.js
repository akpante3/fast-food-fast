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


export { menu };
