import placeNewOrder from './../controllers/orders';


/** Get menu
 * @param {string} req is the request parameter
 * @param {string} res is the response parameter
 * @return {object} the response object
 * @public
*/
const postNewOrder = (req, res) => {
  placeNewOrder(req.body, req.userId).then((order) => {
    res.status(201).send({
      status: 'success',
      message: 'order was placed succcessfully',
      data: order,
    });
  }).catch((message) => {
    res.status(400).send({
      status: 'failure',
      message,
    });
  });
};


export default postNewOrder;
