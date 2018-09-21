import express from 'express';
import auth from './../middlewares/auth';
import newUsers from './../middlewares/users';

const userRoutes = express.Router();

userRoutes.post('/auth/signup', auth, newUsers);


export default userRoutes;
