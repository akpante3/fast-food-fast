import express from 'express';
import {
  authNewUser,
  validate
} from './../middlewares/auth';
import {
  newUsers,
  logInUser
} from './../middlewares/users';

const userRoutes = express.Router();

userRoutes.post('/auth/signup', authNewUser, newUsers);
userRoutes.post('/auth/login', validate, logInUser);


export default userRoutes;
