import expect from 'expect';
import request from 'supertest';

import app from './../../app';

import {
  Orders,
  menu,
} from '../db/dbconnect';

// Get menu
describe('GET /api/v1/menu', () => {
  it('should return menu of avaliable food', (done) => {
    request(app)
      .get('/api/v1/menu')
      .set('Accept', 'application/json')
      .expect(200)
      .expect((res) => {
        expect(res.body.data === menu);
        expect(200);
      })
      .end(done);
  });
});

// Get all orders
describe('GET /api/v1/orders', () => {
  it('respond with json containing a list of all users', (done) => {
    request(app)
      .get('/api/v1/orders')
      .set('Accept', 'application/json')
      .expect(200)
      .expect((res) => {
        expect(res.body.data === Orders);
        expect(200);
      })
      .end(done);
  });
});

// post order
describe('POST /api/v1/orders', () => {
  const data = { foodId: 1 };

  it('it should post order successfully', (done) => {
    request(app)
      .post('/api/v1/orders')
      .send(data)
      .expect(200)
      .expect((res) => {
        expect(res.body.status === 'success');
        expect(200);
      })
      .end(done);
  });

  it('it should return a 404 "not found"', (done) => {
    const item = { foodId: '09' };
    request(app)
      .post('/api/v1/orders')
      .send(item)
      .set('Accept', 'application/json')
      .expect(404)
      .end(done);
  });

  it('it should not place an order when data is empty', (done) => {
    request(app)
      .post('/api/v1/orders')
      .send({})
      .expect(404)
      .end(done);
  });
});
// GET one
describe('GET /api/v1/orders/:id', () => {
  const order = {
    food: 'meat pie',
    id: 65,
    foodId: 12,
  };
  Orders.push(order);
  it('should fetch an order', (done) => {
    request(app)
      .get('/api/v1/orders/65')
      .set('Accept', 'application/json')
      .expect(200)
      .expect((res) => {
        expect(res.body.status === 'success');
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });


  it(' order should not be found', (done) => {
    request(app)
      .get('/api/v1/orders/dfghuy')
      .set('Accept', 'application/json')
      .expect(404)
      .expect((res) => {
        expect(res.body.status === 'failure');
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});
//  PUT orders
describe('PUT /api/v1/orders/:id', () => {
  const order = {
    food: 'meat pie',
    id: 988,
    foodId: 12,
  };
  const status = { status: 'complete' };
  Orders.push(order);
  it('should update status of an order', (done) => {
    request(app)
      .put('/api/v1/orders/988')
      .send(status)
      .set('Accept', 'application/json')
      .expect(200)
      .expect((res) => {
        expect(res.body.status === 'success');
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });

  it('order should not be found', (done) => {
    request(app)
      .put('/api/v1/orders/dfghuy')
      .send(status)
      .set('Accept', 'application/json')
      .expect(404)
      .expect((res) => {
        expect(res.body.status === 'failure');
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });

  it('status was not found', (done) => {
    request(app)
      .put('/api/v1/orders/988')
      .send({})
      .set('Accept', 'application/json')
      .expect(404)
      .expect((res) => {
        expect(res.body.status === 'failure');
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});
