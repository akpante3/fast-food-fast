import expect from 'expect';
import request from 'supertest';

import app from './../../app';

import {
  menu,
  Orders,
} from '../db/dbconnect';

describe('GET /api/v1/menu', () => {
  it('should return menu of all avaliable food', (done) => {
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

describe('GET /api/v1/orders', () => {
  it('respond with json containing a list of all orders', (done) => {
    const data = {
      foodId: 2,
      quantity: 7,
    };
    Orders.push(data);
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


describe('POST /api/v1/orders', () => {
  const data = {
    foodId: 1,
    quantity: 6,
  };

  it(`it should post order successfully when all
   criterials are meet `, (done) => {
    request(app)
      .post('/api/v1/orders')
      .send(data)
      .expect(201)
      .expect((res) => {
        expect(res.body.status === 'success');
        expect(200);
      })
      .end(done);
  });

  it('it should return a 404  when order is not found', (done) => {
    const item = {
      foodId: 700,
      quantity: 7,
    };
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

describe('GET /api/v1/orders/:id', () => {
  it('should fetch an order when the id is found', (done) => {
    const order = {
      food: 'meat pie',
      id: 65,
      foodId: 12,
    };
    Orders.push(order);
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


  it(' order should not be found if the id is not valid', (done) => {
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
  const status = { status: 'completed' };
  it(
    'should update status of an order when all criterials are meet',
    (done) => {
      request(app)
        .put('/api/v1/orders/2')
        .send(status)
        .expect(200)
        .expect((res) => {
          expect(res.body.status === 'success');
          expect(res.body.data.status === status);
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    }
  );


  it('order should be an invalid request', (done) => {
    request(app)
      .put('/api/v1/orders/dfghuy')
      .send(status)
      .set('Accept', 'application/json')
      .expect(400)
      .expect((res) => {
        expect(res.body.status === 'failure');
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });

  it('order should be an invalid request', (done) => {
    const stat = { status: 'code' };
    request(app)
      .put('/api/v1/orders/2')
      .send(stat)
      .set('Accept', 'application/json')
      .expect(400)
      .expect((res) => {
        expect(res.body.status === 'failure');
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });

  it('response should be 404 when status is not found', (done) => {
    request(app)
      .put('/api/v1/orders/988')
      .send({})
      .set('Accept', 'application/json')
      .expect(400)
      .expect((res) => {
        expect(res.body.status === 'failure');
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});

