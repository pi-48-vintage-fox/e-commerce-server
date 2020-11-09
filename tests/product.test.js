const request = require('supertest');
const app = require('../app.js');
const { sequelize } = require('../models/index');
const { queryInterface } = sequelize;
const Jwt = require('../helpers/jwt');
let bait;
let token;

// afterAll(done => {
//   queryInterface.bulkDelete('Products')
//     .then(() => {
//       done();
//     })
//     .catch(err => {
//       done();
//     })
// })

beforeAll(done => {
  token = Jwt.sign({
    id: admin.id,
    first_name: admin.first_name,
    last_name: admin.last_name,
    gender: admin.gender,
    email: admin.email,
    role: admin.role
  })
  done();
})

describe('Test Endpoint POST /products', () => {
  // Success add product
  it('Test add one new product success', done => {
    request(app)
      .post('/products')
      .set("token", token)
      .send({ name: "Sepatu Air Jordan 1", image_url: "https://images.unsplash.com/photo-1602033693387-3531914e7185?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1487&q=80", price: 2200000, stock: 5 })
      .then(response => {
        const { body, status } = response;

        expect(status).toEqual(201);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("name", "Sepatu Air Jordan 1");
        expect(body).toHaveProperty("image_url", "https://images.unsplash.com/photo-1602033693387-3531914e7185?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1487&q=80");
        expect(body).toHaveProperty("price", 2200000);
        expect(body).toHaveProperty("stock", 5);
        bait = body.id;
        done();
      })
      .catch(err => {
        console.log(err);
      })
  })

  // Cannot add product with one or more property has an empty value
  it('Test cannot add product with one or more property has an empty value', done => {
    request(app)
      .post('/products')
      .set("token", token)
      .send({ name: "", image_url: "", price: 2200000, stock: 5 })
      .then(response => {
        const { body, status } = response;

        expect(status).toEqual(400);
        expect(body).toHaveProperty("message", "Product name required, Image URL required");
        // The message would dynamicly changeable according to what you've emptied
        done();
      })
      .catch(err => {
        console.log(err);
      })
  })

  // Cannot add product with stock or price lower than 0
  it('Test cannot add product with stock or price lower than 0', done => {
    request(app)
      .post('/products')
      .set("token", token)
      .send({ name: "Sepatu Air Jordan 1", image_url: "https://images.unsplash.com/photo-1602033693387-3531914e7185?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1487&q=80", price: -2200000, stock: 5 })
      .then(response => {
        const { body, status } = response;
        // console.log(token)
        expect(status).toEqual(400);
        expect(body).toHaveProperty("message", "Price must not be lower than 0");
        // The message would dynamicly changeable according to what you've emptied
        done();
      })
      .catch(err => {
        console.log(err);
      })
  })
})

describe('Test Endpoint GET /products', () => {
  // Success get all products
  it('Test get all products success', done => {
    request(app)
      .get('/products')
      .then(response => {
        const { body, status } = response;

        expect(status).toEqual(200);
        expect(body[0]).toHaveProperty("name", expect.anything());
        expect(body[0]).toHaveProperty("image_url", expect.anything());
        expect(body[0]).toHaveProperty("price", expect.any(Number));
        expect(body[0]).toHaveProperty("stock", expect.any(Number));
        done();
      })
      .catch(err => {
        console.log(err)
      })
  })
})

// describe('Test Endpoint PUT /products/:id', () => {
//   // Success edit product
//   it('Test edit product success', done => {
//     request(app)
//       .put(`/products/:id`)
//       .set("token", token)
//       .send({ name: "Sepatu Air Jordan 1 MID 'Shattered Backboard'", image_url: "https://images.unsplash.com/photo-1602033693387-3531914e7185?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1487&q=80", price: 2200000, stock: 5 })
//       .then(response => {
//         const { body, status } = response;

//         expect(status).toEqual(200);
//         expect(body).toHaveProperty("id", expect.any(Number));
//         expect(body).toHaveProperty("name", "Sepatu Air Jordan 1 MID 'Shattered Backboard'");
//         expect(body).toHaveProperty("image_url", "https://images.unsplash.com/photo-1602033693387-3531914e7185?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1487&q=80");
//         expect(body).toHaveProperty("price", 2200000);
//         expect(body).toHaveProperty("stock", 5);
//         done();
//       })
//       .catch(err => {
//         console.log(err);
//       })
//   })
// })

// describe('Test Endpoint DELETE /products/:id', () => {
//   // Success delete product
//   it('Test delete product success', done => {
//     request(app)
//       .delete(`/products/:id`)
//       .set("token", token)
//       .then(response => {
//         const { body, status } = response;

//         expect(status).toEqual(200);
//         expect(body).toHaveProperty("message", "A product has been successfully deleted");
//       })
//       .catch(err => {
//         console.log(err)
//       })
//   })
// })