import expect from 'expect';
import request from 'supertest';
import app from './../../app';
import { db } from '../db/dbconnect';

let userToken;
let pin;
let foodID;
let userid;
let orderid;
let userid2;

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
      const { token } = res.body.data;
      userToken = token;
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
      const { token } = res.body.data;// Or something
      pin = token;
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

  it(`it should not create a new user when 
  email is invalid`, (done) => {
    const user = {
      email: 'denmoyahoo.com',
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
// login

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
        const { id } = res.body.data;
        userid2 = id;
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
      price: '1000',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6Xqo5jodDjDGH8l4U5v9rEgsvu9mt9D9V18UGXF50r1LpbZMM'
    };
    request(app)
      .post('/api/v1/menu')
      .set('accessToken', userToken)
      .send(post)
      .expect(201)
      .expect((res) => {
        expect(res.body.status === 'success');
        const { foodid } = res.body.data;
        foodID = foodid;
      })
      .end(() => {
        done();
      });
  });

  it('dont post if there is no token found', (done) => {
    const post = {
      food: 'garri',
      price: '1000'
    };
    request(app)
      .post('/api/v1/menu')
      .send(post)
      .expect(400)
      .expect((res) => {
        expect(res.body.status === 'success');
        const { foodid } = res.body.data;
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
      .set('accessToken', userToken)
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
      .set('accessToken', userToken)
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
      .set('accessToken', userToken)
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
      address: '10 round road',
      number: '08064753028',
      orders: [
        {
          foodid: foodID,
          quantity: '6',
        }
      ],
    };
    request(app)
      .post('/api/v1/orders')
      .set('accessToken', userToken)
      .send(order1)
      .expect(201)
      .expect((res) => {
        expect(res.body.status === 'success');
        const { orderID, userId } = res.body.data;
        userid = userId;
        orderid = orderID;
      })
      .end(done);
  });

  it('should post an order when required data is complete', (done) => {
    const order1 = {
      email: 'akpante@yahoo.com',
      number: '08064753028',
      address: '10 round road',
      orders: [
        {
          foodid: 10000,
          quantity: '6',
        }
      ],
    };
    request(app)
      .post('/api/v1/orders')
      .set('accessToken', userToken)
      .send(order1)
      .expect(400)
      .expect((res) => {
        expect(res.body.status === 'failure');
      })
      .end(done);
  });

  it('should not post if quantity property is not found', (done) => {
    const order1 = {
      email: 'akpante@yahoo.com',
      number: '08064753028',
      address: '10 round road',
      orders: [
        {
          foodid: foodID,
          quantity: null
        }
      ],
    };
    request(app)
      .post('/api/v1/orders')
      .set('accessToken', userToken)
      .send(order1)
      .expect(400)
      .expect((res) => {
        expect(res.body.status === 'failure');
      })
      .end(done);
  });

  it('should not post when there is no foodid property', (done) => {
    const order1 = {
      email: 'akpante@yahoo.com',
      number: '08064753028',
      address: '10 round road',
      orders: [
        {
          quantity: '6',
          foodid: null
        }
      ],
    };
    request(app)
      .post('/api/v1/orders')
      .set('accessToken', userToken)
      .send(order1)
      .expect(400)
      .expect((res) => {
        expect(res.body.status === 'failure');
      })
      .end(done);
  });

  it('should not post when name property is missing', (done) => {
    const order2 = {
      email: 'akpante@yahoo.com',
      address: '10 round road',
      orders: [{
        foodid: foodID,
        quantity: '34'
      },
      {
        foodid: foodID,
        quantity: '34'
      },
      ]
    };
    request(app)
      .post('/api/v1/orders')
      .set('accessToken', userToken)
      .send(order2)
      .expect(400)
      .end(() => {
        done();
      });
  });

  it('should not post when address property is missing', (done) => {
    const order3 = {
      email: 'akpante@yahoo.com',
      number: '08064753028',
      orders: [{
        foodid: foodID,
        quantity: '34'
      },
      {
        foodid: foodID,
        quantity: '34'
      },
      ],
    };
    request(app)
      .post('/api/v1/orders')
      .set('accessToken', userToken)
      .send(order3)
      .expect(400)
      .expect((res) => {
        expect(res.body.status === 'failure');
      })
      .end(done);
  });

  it('should not make post when orders property is missing', (done) => {
    const detail = {
      email: 'akpante@yahoo.com',
      number: '08064753028',
      address: '567 bill road',
    };
    request(app)
      .post('/api/v1/orders')
      .set('accessToken', userToken)
      .send(detail)
      .expect(400)
      .expect((res) => {
        expect(res.body.status === 'failure');
      })
      .end(() => {
        done();
      });
  });

  it('should not make post when email property is missing', (done) => {
    const detail = {
      number: '08064753028',
      address: '567 bill road',
    };
    request(app)
      .post('/api/v1/orders')
      .set('accessToken', userToken)
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
  it('should get an order when the id is correct and the user is an admin', (done) => {
    request(app)
      .get(`/api/v1/orders/${orderid}`)
      .set('accessToken', userToken)
      .expect(200)
      .expect((res) => {
        expect(res.body.status === 'failure');
      })
      .end(() => {
        done();
      });
  });

  it('should not get an order when the user is not an admin', (done) => {
    request(app)
      .get(`/api/v1/orders/${orderid}`)
      .set('accessToken', pin)
      .expect(400)
      .expect((res) => {
        expect(res.body.status === 'failure');
      })
      .end(() => {
        done();
      });
  });

  it('should not get an invalid orderid', (done) => {
    request(app)
      .get('/api/v1/orders/15379')
      .set('accessToken', userToken)
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
      .set('accessToken', userToken)
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

// Get users orders
describe('GET /api/v1/orders/:userid/orders', () => {
  it('should get all users orders', (done) => {
    request(app)
      .get(`/api/v1/orders/${userid}/orders`)
      .set('accessToken', userToken)
      .expect(200)
      .expect((res) => {
        expect(res.body.status === 'success');
      })
      .end(() => {
        done();
      });
  });

  it('should not get all users order when order is not valid get all orders', (done) => {
    request(app)
      .get('/api/v1/orders/6567467/orders')
      .set('accessToken', userToken)
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
      .get(`/api/v1/orders/${userid2}/orders`)
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
// PUT
describe('PUT /api/v1/orders', () => {
  it('should give an error if no order was found for an id', (done) => {
    request(app)
      .put('/api/v1/orders/234536')
      .set('accessToken', userToken)
      .expect(400)
      .expect((res) => {
        expect(res.body.status === 'failure');
      })
      .end(() => {
        done();
      });
  });

  it('should return an error when when value is not the spcified value', (done) => {
    request(app)
      .put(`/api/v1/orders/${orderid}`)
      .send({ status: 'food' })
      .set('accessToken', userToken)
      .expect(200)
      .expect((res) => {
        expect(res.body.status === 'failure');
      })
      .end(() => {
        done();
      });
  });

  it('should change the status of an order when status is the specified string', (done) => {
    request(app)
      .put(`/api/v1/orders/${orderid}`)
      .send({ status: 'completed' })
      .set('accessToken', userToken)
      .expect(200)
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

