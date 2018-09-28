import expect from 'expect';
import request from 'supertest';
import app from './../../app';
import { db } from '../db/dbconnect';

let token;
let pin;
let food;
let foodID;
let userid;

before((done) => {
  db.query('DELETE FROM users');
  request(app)
    .post('/api/v1/auth/signup')
    .send({
      email: 'david@yahoo.com',
      username: 'foodadmin',
      password: '123456787',
      address: '10adenekan fadeyi'
    })
    .end((err, res) => {
      token = res.body.data;
    });

  request(app)
    .post('/api/v1/auth/signup')
    .send({
      email: 'daloya@yahoo.com',
      username: 'andi',
      password: '123456787',
      address: '10adenekan fadeyi'
    })
    .end((err, res) => {
      pin = res.body.data;// Or something
    });
  done();
});


describe('POST /api/v1/auth/signup', () => {
  it('should sign up a user when all the avaliable data is complete', (done) => {
    const user = {
      email: 'denmo@yahoo.com',
      username: 'foodadmin',
      password: '123456787',
      address: '10adenekan fadeyi'
    };
    request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .expect(201)
      .end(() => {
        done();
      });
  });

  it('should not sign up a user when email is missing', (done) => {
    const user = {
      username: 'akpante23',
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


  it('should not sign up a username when username is not avaliable', (done) => {
    const user = {
      email: 'denmo@yahoo.com',
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
      .end(() => {
        done();
      });
  });

  it(`it should not create a new user when password
  is missing`, (done) => {
    const user = {
      email: 'denmo@yahoo.com',
      username: 'foodadmin',
      address: '10adenekan fadeyi'
    };
    request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(user)
      .expect(400)
      .end(done);
  });

  it(`it should not create a new user when password
  is missing`, (done) => {
    const user = {
      email: 'denmo@yahoo.com',
      username: 'foodadmin',
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
        userid = res.body.data;
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

  it('it should not login when there is no password', (done) => {
    const user = {
      email: 'enuie@yahoo.com',
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

  it('should not log in when there is no email', (done) => {
    const user = {
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

  it('it should not log in when email is invalid', (done) => {
    const user = {
      email: 'denmoyahoo.com',
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
// post menu
describe('POST /api/v1/menu', () => {
  it('should post new food on the app', (done) => {
    const post = {
      food: 'garri',
      price: '1000'
    };
    request(app)
      .post('/api/v1/menu')
      .set('accessToken', token)
      .send(post)
      .expect(201)
      .expect((res) => {
        expect(res.body.status === 'success');
        let { foodid } = res.body.data;
        food = res.body.data;
        foodID = foodid;
      })
      .end(() => {
        done();
      });
  });

  it('should not post a meal with an invalid token', (done) => {
    const post = {
      food: 'garri',
      price: '1000'
    };
    request(app)
      .post('/api/v1/menu')
      .set('accessToken', 'bgiugifbugbui')
      .send(post)
      .expect(201)
      .expect((res) => {
        expect(res.body.status === 'failure');
      })
      .end(() => {
        done();
      });
  });

  it('should not post when user is not an admin', (done) => {
    const post = {
      food: 'garri',
      price: '1000'
    };
    request(app)
      .post('/api/v1/menu')
      .set('accessToken', pin)
      .send(post)
      .expect(400)
      .expect((res) => {
        expect(res.body.status === 'failure');
      })
      .end(() => {
        done();
      });
  });

  it('should not post when there is not price property', (done) => {
    const post = {
      food: 'garri',
    };
    request(app)
      .post('/api/v1/menu')
      .set('accessToken', token)
      .send(post)
      .expect(400)
      .expect((res) => {
        expect(res.body.status === 'failure');
      })
      .end(() => {
        done();
      });
  });

  it('should not post when food property is not avaliable', (done) => {
    const post = {
      price: '1000'
    };
    request(app)
      .post('/api/v1/menu')
      .set('accessToken', token)
      .send(post)
      .expect(400)
      .expect((res) => {
        expect(res.body.status === 'failure');
      })
      .end(() => {
        done();
      });
  });
});
// GET menu
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
        .set('accessToken', 'vchtcushjhyg')
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
// post order
describe('POST /api/v1/orders', () => {
  it('should post an order when required data is complete', (done) => {
    const order1 = {
      email: 'akpante@yahoo.com',
      number: '08064753028',
      address: '10 round road',
      orders: [
        {
          foodid: foodID,
          quantity: '6',
        }
      ],
    };
    request(app)
      .post('/api/v1/orders')
      .set('accessToken', token)
      .send(order1)
      .expect(201)
      .expect((res) => {
        expect(res.body.status === 'success');
      })
      .end(done);
  });

  it('should not post food when a property is missing', (done) => {
    const order2 = {
      email: 'akpante@yahoo.com',
      address: '10 round road',
      orders: [{
        foodId: '1',
        quantity: '34'
      },
      {
        foodId: '1',
        quantity: '34'
      },
      ]
    };
    request(app)
      .post('/api/v1/orders')
      .set('accessToken', token)
      .send(order2)
      .expect(400)
      .end(() => {
        done();
      });
  });

  it('should not post an order when there is incorrect foodId', (done) => {
    const order3 = {
      email: 'akpante@yahoo.com',
      number: '08064753028',
      address: '10 round road',
      orders: [{
        foodId: '1',
        quantity: '34'
      },
      {
        foodId: '1',
        quantity: '34'
      },
      ],
    };
    request(app)
      .post('/api/v1/orders')
      .set('accessToken', token)
      .send(order3)
      .expect(400)
      .expect((res) => {
        expect(res.body.status === 'failure');
      })
      .end(done);
  });

  it('should not make post if quantity is not an integer', (done) => {
    const detail = {
      email: 'akpante@yahoo.com',
      number: '08064753028',
      address: 567,
      orders: [{
      }],
    };
    request(app)
      .post('/api/v1/orders')
      .set('accessToken', token)
      .send(detail)
      .expect(400)
      .expect((res) => {
        expect(res.body.status === 'failure');
      })
      .end(() => {
        done();
      });
  });
});
// GET an order
describe('GET /api/v1/orders/:id', () => {
  it('should be an error when id does not exist', (done) => {
    request(app)
      .get('/api/v1/orders/15379')
      .set('accessToken', token)
      .expect(400)
      .expect((res) => {
        expect(res.body.status === 'failure');
      })
      .end(() => {
        done();
      });
  });

  it('should not get menu with an invalid token', (done) => {
    request(app)
      .get('/api/v1/orders/15379')
      .set('accessToken', 'gfratsfthr')
      .expect(400)
      .expect((res) => {
        expect(res.body.status === 'failure');
      })
      .end(() => {
        done();
      });
  });
});

// GET all order
describe('GET /api/v1/orders', () => {
  it('should get all orders', (done) => {
    request(app)
      .get('/api/v1/orders')
      .set('accessToken', token)
      .expect(200)
      .expect((res) => {
        expect(res.body.status === 'success');
      })
      .end(() => {
        done();
      });
  });

  it('should give an error if user is not an admin', (done) => {
    request(app)
      .get('/api/v1/orders')
      .set('accessToken', pin)
      .expect(400)
      .expect((res) => {
        expect(res.body.status === 'failure');
      })
      .end(() => {
        done();
      });
  });
});

// Get users order
describe('GET /api/v1/orders/:userid/orders', () => {
  it('should get all orders', (done) => {
    request(app)
      .get('/api/v1/orders/1/orders')
      .set('accessToken', token)
      .expect(200)
      .expect((res) => {
        expect(res.body.status === 'success');
      })
      .end(() => {
        done();
      });
  });

  it('should give an error if no order was found for an id', (done) => {
    request(app)
      .get('/api/v1/orders/234536/orders')
      .set('accessToken', token)
      .expect(400)
      .expect((res) => {
        expect(res.body.status === 'failure');
      })
      .end(() => {
        done();
      });
  });
});
// PUT
describe('PUT /api/v1/orders', () => {
  it('should give an error if no order was found for an id', (done) => {
    request(app)
      .put('/api/v1/orders/234536')
      .set('accessToken', token)
      .expect(400)
      .expect((res) => {
        expect(res.body.status === 'failure');
      })
      .end(() => {
        done();
      });
  });

  it('should give an error when status is not found', (done) => {
    request(app)
      .put('/api/v1/orders/234536')
      .send({ status: '' })
      .set('accessToken', token)
      .expect(400)
      .expect((res) => {
        expect(res.body.status === 'failure');
      })
      .end(() => {
        done();
      });
  });

  it('should not update status when user is not admin', (done) => {
    request(app)
      .put('/api/v1/orders/234536')
      .send({ status: 'completed' })
      .set('accessToken', pin)
      .expect(400)
      .expect((res) => {
        expect(res.body.status === 'failure');
      })
      .end(() => {
        done();
      });
  });
});

