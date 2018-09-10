
import {
  Orders,
  food,
} from '../db/dbconnect';


const allOrders = () => Promise.resolve(Orders);

const getOne = (id) => {
  const orderId = parseInt(id, 10);
  const result = Orders.find(order => order.id === orderId);
  if (!result) {
    return Promise.reject();
  }
  return Promise.resolve(result);
};

const placeNewOrder = (orderId) => {
  const item = parseInt(orderId, 10);
  const result = food.find(order => order.orderId === item);
  if (!result) {
    return Promise.reject();
  }
  const neworder = {
    food: result.food,
    orderId: result.orderId,
    id: Orders.length + 1,
  };
  Orders.push(neworder);
  return Promise.resolve(neworder);
};

export {
  allOrders,
  getOne,
  placeNewOrder,
};
