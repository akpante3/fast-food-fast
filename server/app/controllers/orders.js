
import { Orders } from '../db/dbconnect';


const allOrders = () => Promise.resolve(Orders);

const getOne = (id) => {
  const orderId = parseInt(id, 10);
  const result = Orders.find(order => order.id === orderId);
  if (!result) {
    return Promise.reject();
  }
  return Promise.resolve(result);
};

export {
  allOrders,
  getOne,
};
