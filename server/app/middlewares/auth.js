import jwt from 'jsonwebtoken';

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const validate = (req, res, next) => {
  if (!validateEmail(req.body.email)) {
    return res.status(400).send({
      status: 'failure',
      message: 'invalid email or username,please input a valid email',
    });
  }
  next();
};

const authNewUser = (req, res, next) => {
  const userName = req.body.username;

  if (!req.body.email || !req.body.password || !req.body.username || !req.body.address) {
    return res.status(400).send({
      status: 'failure',
      message: 'please input a valid password, username, email, address',
    });
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
  validateEmail
};

