import expect from 'expect';
import request from 'supertest';
import app from './../../app';
import db from '../db/dbconnect';

before((done) => {
  db.query('DELETE FROM users');
  done();
});

describe('POST /api/v1/auth/signup', () => {
  it('should sign up a user when all the avaliable data is complete', (done) => {
    const user = {
      email: 'denmo@yahoo.com',
      username: 'akpante',
      password: '123456787',
      address: '10adenekan fadeyi'
    };
    request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .expect(200)
      .end(() => {
        done();
      });
  });

  it('should sign up a user when all the avaliable data is complete', (done) => {
    const user = {
      email: 'd@yahoo.com',
      username: 'akpante23/..',
      password: '123456787',
      address: '10adenekan fadeyi'
    };
    request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .expect(400)
      .end(() => {
        done();
      });
  });


  it('should not create a user when email is incorrect', (done) => {
    const user = {
      email: 'susayahoo.com',
      password: '123456787',
    };
    request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(user)
      .expect(400)
      .expect((res) => {
        expect(res.body.status === 'failure');
      })
      .end(() => {
        done();
      });
  });

  it(`it should not create a new user when the sign up 
    properties are not complete`, (done) => {
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