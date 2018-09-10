
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

const placeNewOrder = (foodId) => {
  const item = parseInt(foodId, 10);
  const result = food.find(order => order.foodId === item);
  if (!result) {
    return Promise.reject();
  }
  const neworder = {
    food: result.food,
    foodId: result.foodId,
    id: Orders.length + 1,
  };
  Orders.push(neworder);
  return Promise.resolve(neworder);
};

const updateOrder = (id, status) => {
  const orderId = parseInt(id, 10);
  const result = Orders.find(order => order.id === orderId);
  if (!result) {
    return Promise.reject();
  }
  result.status = status;
  return Promise.resolve(result);
};

export {
  allOrders,
  getOne,
  placeNewOrder,
  updateOrder,
};
