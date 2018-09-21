import expect from 'expect';
import request from 'supertest';
import app from './../../app';
import db from '../db/dbconnect';

before((done) => {
  db.query('DELETE FROM users');
  done();
});

describe('GET /api/v1/auth/signup', () => {
  it('should sign up a user when all the avaliable data is complete', (done) => {
    const user = {
      email: 'challenge@yahoo.com',
      username: 'akpante',
      password: '123456787',
      address: '10adenekan fadeyi'
    };
    request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .expect(201)
      .expect()
      .end(() => {
        done();
      });
  });

  it('should not create a user when email is incorrect', (done) => {
    const user = {
      email: 'susayahoo.com',
      username: 'akpante',
      password: '123456787',
      address: '10adenekan fadeyi'
    };
    request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(user)
      .expect(400)
      .expect((res) => {
        expect(res.body.status === 'failure');
      })
      .end(done);
  });

  it(`it should not create a new user when
   the signup data is not complete`, (done) => {
    const user = {
      email: 'susan@yahoo.com',
      username: 'akpante',
      password: '123456787',
    };
    request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(user)
      .expect(400)
      .end(done);
  });
});
