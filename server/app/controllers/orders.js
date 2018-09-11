
import {
  Orders,
  menu,
} from '../db/dbconnect';


const allOrders = () => Promise.resolve(Orders);

const allfood = () => Promise.resolve(menu);

const getOne = (id) => {
  const orderId = parseInt(id, 10);
  const result = Orders.find(order => order.id === orderId);
  if (!result) {
    return Promise.reject();
  }
  return Promise.resolve(result);
};


const placeNewOrder = (foodId) => {
  const noFoodId = 'foodId was not found,plese input foodId';
  const noResult = 'order was not found,please place valid order';

  if (!foodId) {
    return Promise.reject(noFoodId);
  }
  const item = parseInt(foodId, 10);
  const result = menu.find(order => order.foodId === item);
  if (!result) {
    return Promise.reject(noResult);
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
  const notFound = 'order was not found';
  const noStatus = 'status was not found,please input status';
  if (!status) {
    return Promise.reject(noStatus);
  }
  const orderId = parseInt(id, 10);
  const result = Orders.find(order => order.id === orderId);
  if (!result) {
    return Promise.reject(notFound);
  }
  result.status = status;
  return Promise.resolve(result);
};

export {
  allOrders,
  getOne,
  placeNewOrder,
  updateOrder,
  allfood,
};
