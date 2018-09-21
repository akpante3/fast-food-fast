import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db/dbconnect';


/**  create a User
 * @param {string} email
 * @param {string} password
 * @param {string} user
 * @param {string} address
 * @return {string} token
 * @public
*/
const createUser = (email, password, user, address) => {
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
      return Promise.resolve({
        id: data.id,
        email: data.email,
        name: data.name,
        address: data.address,
        token,

      });
    });
};

export default createUser;
