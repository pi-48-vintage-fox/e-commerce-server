const request = require('supertest');
const app = require('../app');

describe('POST /product', () => {
    it('response add new product', (done) => {
        request(app)
            .post('/product')
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
            .catch(console.log)
    })

    it('response validation add product error', (done) => {
        request(app)
            .post('/product')
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
})