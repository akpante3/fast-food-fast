import { menu, newFood } from './../controllers/orders';


/** Get menu
 * @param {string} req is the request parameter
 * @param {string} res is the response parameter
 * @return {object} the response object
 * @public
*/
const getMenu = (req, res) => {
  menu().then((menuList) => {
    res.send({
      status: 'success',
      message: 'questions were succcessfully fetched',
      data: menuList,
    });
  }).catch(() => res.status(404).send({
    status: 'failure',
    message: 'questions not found',
  }));
};

/** Post menu
 * @param {string} req is the request parameter
 * @param {string} res is the response parameter
 * @return {object} the response object
 * @public
*/
const postFood = (req, res) => {
  newFood(req.body.food, req.username).then((posted) => {
    res.send({
      status: 'success',
      message: 'question was succcessfully fetched',
      data: posted,
    });
  }).catch((error) => {
    res.status(404).send({
      status: 'failure',
      message: error.message,
    });
  });
};

export {
  postFood,
  getMenu
};
