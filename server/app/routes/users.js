import express from 'express';
import authNewUser from './../middlewares/auth';
import newUsers from './../middlewares/users';

const userRoutes = express.Router();

userRoutes.post('/auth/signup', authNewUser, newUsers);


export default userRoutes;
