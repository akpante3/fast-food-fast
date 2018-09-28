import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db/dbconnect';


const creteuserDb = (email, password, user, address) => {
  const hashedPassword = bcrypt.hashSync(password, 8);
  return db.one(`INSERT INTO users (email, password, name, address) 
      VALUES($1,$2,$3,$4) RETURNING id, email, name, address `, [email, hashedPassword, user, address])
    .then((data) => {
      const token = jwt.sign(
        { id: data.id, name: user },
        process.env.JWT_SECRET, {
          expiresIn: 86400,
        }
      );
      return Promise.resolve(token);
    });
};

const loginDb = (email, password) => {
  return db.one(`SELECT * FROM users 
WHERE email =$1`, email)
    .then((data) => {
      const passwordIsValid = bcrypt.compareSync(password, data.password);
      const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET, {
        expiresIn: 86400,
      });
      if (!passwordIsValid) {
        return Promise.reject(Error);
      }
      const user = {
        id: data.id,
        username: data.name,
        email: data.email,
        token
      };

      return Promise.resolve(user);
    }).catch(e => Promise.reject(e));
};

export {
  creteuserDb,
  loginDb
};
