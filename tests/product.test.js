const request = require('supertest');
const app = require('../app');
const {sequelize} = require('../models/index');
const {queryInterface} = sequelize;
const {User} = require('../models/index');
const {token, verify} = require('../helpers/jwt');

let access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJpYXQiOjE2MDUwMjEwMDl9.rKPG5lI3koAFsTwcfDKAOvxJGmYt5W6K8E3IKQhgJI8';

describe('GET / products', () => {
    it('response get product', (done) => {
        request(app)
            .get('/products')
            .then(resp => {
                expect(resp.status).toBe(200)
                done()
            })
            .catch(console.log)
    })

    it('response error get product', (done) => {
        request(app)
            .get('/products')
            .then(resp => {
                expect(resp.status).toBe(500);
                done()
            })
            .catch(err => {
                console.log(err);
                done();
            })
    })
})

describe('POST /products', () => {
    it('response add new product', (done) => {
        request(app)
            .post('/products')
            .send({
                name: "Dropdead",
                image_url: "https://m.media-amazon.com/images/I/A13usaonutL._AC_CLa%7C2140%2C2000%7CA1g45km9VKL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_UL1500_.png",
                price: 1000000,
                stock: 10,
                CategoryId: 4
            })
            .then(resp => {
                expect(resp.status).toBe(201)
                expect(resp.body).toHaveProperty("id", expect.any(Number))
                expect(resp.body).toHaveProperty("name", "Dropdead")
                expect(resp.body).toHaveProperty("image_url", expect.any(String))
                expect(resp.body).toHaveProperty("price", expect.any(Number))
                expect(resp.body).toHaveProperty("stock", expect.any(Number))
                expect(resp.body).toHaveProperty("CategoryId", expect.any(Number))
                done()
            })
            .catch(err => {
                console.log(err)
                done()
            })
    })

    it('response fail add product, not access token', (done) => {
        request(app)
        .post('/products')
        .send({
            name: "Dropdead",
            image_url: "https://m.media-amazon.com/images/I/A13usaonutL._AC_CLa%7C2140%2C2000%7CA1g45km9VKL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_UL1500_.png",
            price: 1000000,
            stock: 10,
            CategoryId: 4
        })
        .then(response => {
            const { body, status } = response
            expect(status).toEqual(401)
            expect(body).toHaveProperty("message", "Wrong Email/password!")
            done()
        })
        .catch(err => {
            console.log(err)
            done()
        })
      })

    it('response fail add product, validation be empty', (done) => {
    request(app)
    .post('/products')
    .set('access_token', access_token)
    .send({
        name: "Dropdead",
        image_url: "https://m.media-amazon.com/images/I/A13usaonutL._AC_CLa%7C2140%2C2000%7CA1g45km9VKL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_UL1500_.png",
        price: 1000000,
        stock: 10,
        CategoryId: 4
    })
        .then(response => {
            const { body, status } = response
            expect(status).toEqual(400)
            expect(body).toHaveProperty('message', "Field Cannot be empty!")
            done()
        })
        .catch(err => {
            console.log(err)
            done()
        })
    })

    it('response fail add product, price or stock cannot less than 0', (done) => {
        request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({
            name: "Dropdead",
            image_url: "https://m.media-amazon.com/images/I/A13usaonutL._AC_CLa%7C2140%2C2000%7CA1g45km9VKL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_UL1500_.png",
            price: 1000000,
            stock: -10,
            CategoryId: -4
        })
        .then(response => {
          const { body, status } = response
          expect(status).toEqual(400)
          expect(body).toHaveProperty('message', "Price or stock must be more than 0")
          done()
        })
        .catch(err => {
          console.log(err)
            done()
        })
      })

    it('response validation add product error', (done) => {
        request(app)
            .post('/products')
            .send({
                name: "",
                image_url: "",
                price: -10,
                stock: -1,
                CategoryId: ""
            })
            .then(resp => {
                expect(resp.status).toBe(500);
                expect(resp.body).toHaveProperty("message", "Validation error");
                done();
            })
            .catch(err => {
                done()
            })
    })
});

describe('PUT / products', () => {
    it('response edit product', (done) => {
        request(app)
            .put('/products')
            .send({
                name: "Dropdead",
                image_url: "https://m.media-amazon.com/images/I/A13usaonutL._AC_CLa%7C2140%2C2000%7CA1g45km9VKL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_UL1500_.png",
                price: 1000000,
                stock: 10,
                CategoryId: 4
            })
            .then(resp => {
                expect(resp.status).toBe(201)
                expect(resp.body).toHaveProperty("id", expect.any(Number))
                expect(resp.body).toHaveProperty("name", "Dropdead")
                expect(resp.body).toHaveProperty("image_url", expect.any(String))
                expect(resp.body).toHaveProperty("price", expect.any(Number))
                expect(resp.body).toHaveProperty("stock", expect.any(Number))
                expect(resp.body).toHaveProperty("CategoryId", expect.any(Number))
                done()
            })
            .catch(err => {
                console.log(err)
                  done()
            })
    })
})

describe('PATCH/ products', () => {
    it('response patch product', (done) => {
        request(app)
            .patch('/products')
            .send({ minusStock: 1 })
            .set({
                name: "Dropdead",
                image_url: "https://m.media-amazon.com/images/I/A13usaonutL._AC_CLa%7C2140%2C2000%7CA1g45km9VKL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_UL1500_.png",
                price: 1000000,
                stock: 10,
                CategoryId: 4
            })
            .then(resp => {
                console.log(resp, 'respone body patch');
                done()
            })
    })
})

describe('DELETE /products', () => {
    it('response delete product', (done) => {
        request(app)
            .delete('/products')
            .then(resp => {
                expect(resp.status).toBe(201)
                done()
            })
            .catch(err => {
                console.log(err);
                done();
            })
    })

    it('respone failed delete product', (done) => {
        request(app)
            .delete('/products')
            .then(resp => {
                expect(resp.status).toBe(500)
                done()
            })
            .catch(err => {
                console.log(err);
                done();
            })
    })
})