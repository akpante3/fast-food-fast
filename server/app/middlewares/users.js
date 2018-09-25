import { createUser, login } from './../controllers/users';

const newUsers = (req, res) => {
  const user = (req.body.username).trim();
  createUser(req.body.email, req.body.password, user, req.body.address)
    .then((token) => {
      res.status(201).send({
        status: 'success',
        message: 'user was created succcessfully',
        data: token,
      });
    }).catch((error) => {
      res.status(400).send({
        status: 'failure',
        message: error.message,
      });
    });
};

const logInUser = (req, res) => {
  login(req.body.email, req.body.password).then((data) => {
    res.status(200).send({
      auth: true,
      status: 'success',
      message: 'login was succcessfully',
      data,
    });
  }).catch(() => res.status(400).send({
    status: 'failure',
    message: 'users was not found',
  }));
};

export {
  newUsers,
  logInUser
};
