import jwt from 'jsonwebtoken';
import { db } from '../db/dbconnect';

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
const missing = (report, value) => {
  return report.status(400).send({
    status: 'failure',
    message: `please ${value} is invalid`,
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
  const price = /^\d+$/.test(req.body.price);
  const food = /^[a-zA-Z]+$/.test(req.body.food);
  const isUrl = (s) => {
    const regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regexp.test(s);
  };
  if (food !== true || !req.body.food) {
    return missing(res, 'food');
  }
  if (price !== true || !req.body.price) {
    return missing(res, 'price');
  }
  if (isUrl(req.body.image) !== true) {
    return missing(res, 'url');
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
  const phoneNumber = /^\d+$/.test(number);

  if (!validateEmail(email) || email.length > 50) {
    return missing(res, 'email');
  } if (phoneNumber !== true || number.length > 14) {
    return missing(res, 'phone number');
  } else if (!address || address.length > 100) {
    return missing(res, 'address');
  } else if (!orders || orders.length === 0) {
    return missing(res, 'place a valid order,quantity');
  }

  const declineFood = [];
  const declineQuantity = [];
  db.any('SELECT FROM users WHERE id = $1', req.userId).then((data) => {
    if (data.length === 0) {
      return missing(res, 'user');
    }
  });

  return db.tx((data) => {
    return orders.forEach((order) => {
      const quantity = /^\d+$/.test(order.quantity);
      const foodid = /^\d+$/.test(order.foodid);
      if (quantity !== true || (order.quantity).length > 3 || !order.quantity) {
        declineQuantity.push(order);
      } else
      if (!order.foodid || foodid !== true) {
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
  });
};

const authNewUser = (req, res, next) => {
  const userName = (req.body.username).trim();
  const email = validateEmail(req.body.email);

  if (!email || email.length > 50) {
    return missing(res, 'email');
  } if (!req.body.password || (req.body.password).length > 50) {
    return missing(res, 'password');
  } else if (!userName || userName.length > 30 || /^[a-zA-Z0-9- ]*$/.test(userName) === false) {
    return missing(res, 'username');
  } else if (!req.body.address || (req.body.address).length > 100 || /^[a-zA-Z0-9- ]*$/.test(req.body.address) === false) {
    return missing(res, 'address');
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

