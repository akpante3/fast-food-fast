import {
  creteuserDb,
  loginDb
} from '../db/userDb';


/**  create a User
 * @param {string} email
 * @param {string} password
 * @param {string} user
 * @param {string} address
 * @return {string} token
 * @public
*/
const createUser = (email, password, user, address) => {
  debugger;
  return creteuserDb(email, password, user, address).then((data) => {
    return Promise.resolve(data);
  }).catch(() => {
    return Promise.reject();
  });
};
const login = (email, password) => {
  return loginDb(email, password).then((data) => {
    return Promise.resolve(data);
  }).catch(() => {
    return Promise.reject();
  });
};

export {
  createUser,
  login
};
