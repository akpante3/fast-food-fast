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

export {
  getMenu,
};
