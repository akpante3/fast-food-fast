import jwt from 'jsonwebtoken';
import { db } from '../db/dbconnect';

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
const missing = (report, value) => {
  return report.status(400).send({
    status: 'failure',
    message: `please input a valid ${value}`,
  });
};

const usersAccess = (req, res, next) => {
  const id = parseInt(req.params.userId, 0);
  if (id !== req.userId) {
    return res.status(400).send({
      status: 'failure',
      message: 'this feature is only avaliable to the user',
    });
  }
  next();
};

const foodAdmin = (req, res, next) => {
  if (req.username !== 'foodadmin') {
    return res.status(400).send({
      status: 'failure',
      message: 'this feature is only avaliable to the food amin',
    });
  }
  next();
};


const validate = (req, res, next) => {
  if (!validateEmail(req.body.email)) {
    return res.status(400).send({
      status: 'failure',
      message: 'invalid email,please input a valid email',
    });
  }
  if (!req.body.password) {
    return missing(res, 'password');
  }
  next();
};

const validatePostFood = (req, res, next) => {
  if (!req.body.price) {
    return missing(res, 'price');
  }
  if (!req.body.price) {
    return missing(res, 'price');
  }
  next();
};
const validateFoodId = (req, res, next) => {
  const {
    orders,
    email,
    number,
    address
  } = req.body;

  if (!validateEmail(email)) {
    return missing(res, 'email');
  } if (!number) {
    return missing(res, 'number');
  } else if (!address) {
    return missing(res, 'address');
  } else if (!orders) {
    return missing(res, 'orders');
  }
  const declineFood = [];
  const declineQuantity = [];
  return db.tx((data) => {
    return orders.map((order) => {
      if (!order.quantity) {
        declineQuantity.push(order);
      }
      if (!order.foodid) {
        declineFood.push(order);
      }
      return data.any('select * from menu where foodid=$1', order.foodid).then((foodid) => {
        if (foodid.length === 0 || !foodid.length) {
          declineFood.push(false);
        }
      });
    });
  }).then(() => {
    if (declineFood.length !== 0) {
      return missing(res, 'foodid');
    }
    if (declineQuantity.length !== 0) {
      return missing(res, 'quantity');
    }
    next();
  }).catch(() => {
    return res.status(400).send({
      status: 'failure',
      message: 'invalid request',
    });
  });
};

const authNewUser = (req, res, next) => {
  const userName = req.body.username;


  if (!req.body.email) {
    return missing(res, 'email');
  } if (!req.body.password) {
    return missing(res, 'password');
  } else if (!req.body.username) {
    return missing(res, 'username');
  } else if (!req.body.address) {
    return missing(res, 'address');
  }

  if (!validateEmail(req.body.email) || !(/^[a-zA-Z]+$/.test(userName.trim()))) {
    return res.status(400).send({
      status: 'failure',
      message: 'invalid email or username,please input a valid email',
    });
  }
  next();
};

const authenticate = (req, res, next) => {
  const token = req.header('accessToken');
  if (token) {
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id;
      req.username = decoded.name;
      next();
    } catch (error) {
      res.status(400).send({
        status: 'failure',
        message: 'token is not valid, please insert a valid token',
      });
    }
  } else if (!token) {
    res.status(401).send({
      status: 'failure',
      message: 'access-token was not found',
    });
  }
};

export {
  authNewUser,
  validate,
  authenticate,
  validateEmail,
  validateFoodId,
  foodAdmin,
  usersAccess,
  validatePostFood
};

