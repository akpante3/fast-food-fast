import expect from 'expect';
import request from 'supertest';
import app from './../../app';
import db from '../db/dbconnect';

let token;

before((done) => {
  db.query('delete from users');
  request(app)
    .post('/api/v1/auth/signup')
    .send({
      email: 'david@yahoo.com',
      username: 'foodamin',
      password: '123456787',
      address: '10adenekan fadeyi'
    })
    .end((err, res) => {
      token = res.body.data;// Or something
      console.log(token, 'fgrhyujg==============================================================');
      done();
    });
});

describe('POST /api/v1/auth/signup', () => {
  it('should sign up a user when all the avaliable data is complete', (done) => {
    const user = {
      email: 'denmo@yahoo.com',
      username: 'foodamin',
      password: '123456787',
      address: '10adenekan fadeyi'
    };
    request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .expect(201)
      .end(() => {
        console.log(token, '==+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
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


describe('POST /api/v1/auth/login', () => {
  it('should log in a user when all the avaliable data is complete', (done) => {
    const user = {
      email: 'denmo@yahoo.com',
      password: '123456787',
    };
    request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .expect(200)
      .expect((res) => {
        expect(res.body.status === 'success');
      })
      .end(done);
  });

  it('should not log in when password is not correct', (done) => {
    const user = {
      email: 'denmo@yahoo.com',
      password: 'ny67bt58',
    };
    request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .expect(400)
      .expect((res) => {
        expect(res.body.status === 'failure');
      })
      .end(done);
  });

  it('it should not with incomplete data', (done) => {
    const user = {
      email: 'enuie@yahoo.com',
      password: 'akp',
    };
    request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .expect(400)
      .expect((res) => {
        expect(res.body.status === 'failure');
      })
      .end(() => {
        done();
      });
  });

  it('should not log in a user wit the wrong email', (done) => {
    const user = {
      email: 'enuieyahoo.com',
      password: '1234bt5ny6',
    };
    request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .expect(400)
      .expect((res) => {
        expect(res.body.status === 'failure');
      })
      .end(() => {
        done();
      });
  });

  it('it should not log in a user when all the avaliable data is complete', (done) => {
    const user = {
      email: 'denmo@yahoo.com',
      password: '12345677',
    };
    request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .expect(400)
      .expect((res) => {
        expect(res.body.status === 'failure');
      })
      .end(() => {
        done();
      });
  });
});

describe('POST /api/v1/menu', () => {
  it('should post new food on the app', (done) => {
    request(app)
      .post('/api/v1/menu')
      .set('accessToken', token)
      .expect(201)
      .expect((res) => {
        expect(res.body.status === 'success');
      })
      .end(() => {
        done();
      });
  });

  it('should not post a meal with an invalid token', (done) => {
    request(app)
      .post('/api/v1/menu')
      .set('accessToken', 'bgiugifbugbui')
      .expect(201)
      .expect((res) => {
        expect(res.body.status === 'failure');
      })
      .end(() => {
        done();
      });
  });

  it('should not post food when token is not found', (done) => {
    request(app)
      .post('/api/v1/menu')
      .expect(400)
      .expect((res) => {
        expect(res.body.status === 'failure');
      })
      .end(() => {
        done();
      });
  });
});

describe('GET /api/v1/menu', () => {
  it('should get the menu when user has a token', (done) => {
    request(app)
      .get('/api/v1/menu')
      .set('accessToken', token)
      .expect(200)
      .expect((res) => {
        expect(res.body.status === 'failure');
      })
      .end(() => {
        done();
      });

    it('should not get menu when token is not found', (done) => {
      request(app)
        .get('/api/v1/menu')
        .expect(400)
        .expect((res) => {
          expect(res.body.status === 'failure');
        })
        .end(() => {
          done();
        });
    });
  });
});
