import validator from 'email-validator';


const validate = (req, res, next) => {
  if (!validator.validate(req.body.email)) {
    return res.status(400).send({
      status: 'failure',
      message: 'invalid email or username,please input a valid email',
    });
  }
  next();
};

const authNewUser = (req, res, next) => {
  const userName = req.body.username.trim();

  if (!req.body.email || !req.body.password || !req.body.username || !req.body.address) {
    return res.status(400).send({
      status: 'failure',
      message: 'please input a valid password, username, email, address',
    });
  }
  if (!validator.validate(req.body.email) || !(/^[a-zA-Z]+$/.test(userName))) {
    return res.status(400).send({
      status: 'failure',
      message: 'invalid email or username,please input a valid email',
    });
  }
  next();
};


export {
  authNewUser,
  validate
};

