import { db } from '../db/dbconnect';


const menuDb = () => {
  return db.any('select * from menu')
    .then((data) => {
      return Promise.resolve(data);
    });
};

const newfoodDb = (food, username) => {
  if (username !== 'foodamin') {
    return Promise.reject(new Error('this Feature is only avaliable to the admin'));
  }
  return db.one(`INSERT INTO menu (food)
       VALUES($1) RETURNING foodId, food`, food)
    .then((data) => {
      return Promise.resolve(data);
    });
};

const postOrdersDb = (ordered, userId) => {
  const orderID = new Date().valueOf();
  const time = new Date();
  const date = time.getDate();
  const month = time.getMonth();
  const year = time.getFullYear();
  const timeOrdered = `${date} - ${month} - ${year}`;

  const {
    number,
    address,
    email,
    orders
  } = ordered;


  return db.tx((data) => {
    return orders.forEach((order) => {
      return data.one(
        `INSERT INTO orders(quantity,timeOrdered,foodid,address,email,orderid,userid,status)
      VALUES($1,$2,$3,$4,$5,$6,$7,$8)`,
        [order.quantity, timeOrdered, order.foodid, address, email, orderID, userId, 'pending']
      );
    });
  }).then(() => {
    const details = {
      number,
      address,
      email,
      timeOrdered,
      orderID,
      userId,
      orders
    };
    return Promise.resolve(details);
  }).catch((error) => {
    return Promise.reject(error.message);
  });
};

const getAllDb = () => {
  return db.any('SELECT * FROM orders')
    .then((data) => {
      return Promise.resolve(data);
    });
};

const getOneDb = (id) => {
  return db.any(`SELECT * FROM orders
    WHERE orderID=$1`, id)
    .then((data) => {
      if (data.length === 0 || !data) {
        return Promise.reject();
      }
      return Promise.resolve(data);
    });
};

const userOrdersDb = (id) => {
  return db.any(`SELECT * FROM orders
    WHERE userid=$1`, id)
    .then((data) => {
      if (data.length === 0) {
        return Promise.reject(new Error('invalid request,No orders found with this id'));
      }
      return Promise.resolve(data);
    });
};

const statusDb = (id, statusUpdate) => {
  return db.one(`UPDATE orders SET status='${statusUpdate}'
   WHERE orderid = '${id}'`)
    .then(() => {
      return Promise.resolve('status was updated successfully');
    }).catch((error) => {
      console.log(error.message);
    });
};
export {
  menuDb,
  newfoodDb,
  postOrdersDb,
  getAllDb,
  getOneDb,
  userOrdersDb,
  statusDb
};
