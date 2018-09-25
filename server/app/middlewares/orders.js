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
      message: 'menu was successfully fetched',
      data: menuList,
    });
  });
};

/** Post menu
 * @param {string} req is the request parameter
 * @param {string} res is the response parameter
 * @return {object} the response object
 * @public
*/
const postFood = (req, res) => {
  newFood(req.body.food, req.username).then((posted) => {
    res.status(201).send({
      status: 'success',
      message: 'food was posted successfully',
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
  getMenu,
  postFood
};
