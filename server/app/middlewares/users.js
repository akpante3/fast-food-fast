import createUser from './../controllers/users';

const newUsers = (req, res) => {
  const user = req.body.username.trim();
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

export default newUsers;
