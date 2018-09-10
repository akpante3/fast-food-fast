
import {
  allOrders,
  getOne,
} from './../controllers/orders';

/** Get all question
 * @param {object}
 * @return {object}
 * @public
*/
const getAllOrders = (req, res) => {
  allOrders().then((orders) => {
    res.send({
      status: 'success',
      message: 'orders were fetched succcessfully',
      data: orders,
    });
  }).catch(() => res.status(404).send({
    status: 'failure',
    message: 'Orders were not found',
  }));
};


export { getAllOrders };
