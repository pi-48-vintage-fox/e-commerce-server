const request = require('supertest');
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { User, Product } = require('../models')
const { signToken } = require('../helpers/jwt');


describe('Testing Product', () => {
    let access_token, access_token1, product, productUser
    let newProduct = {
        "name": "Liverpool 1st jersey-player",
        "image_url": "https://www.soccerpro.com/wp-content/uploads/cz2625_687_nike_liverpool_home_match_jsy_2020_21_01.jpg",
        "price": 1600000,
        "stock": 10,
        "category": "Nike"
    }
    let productNegativeValue = {
        "name": "Liverpool 1st jersey-player",
        "image_url": "https://www.soccerpro.com/wp-content/uploads/cz2625_687_nike_liverpool_home_match_jsy_2020_21_01.jpg",
        "price": -1600000,
        "stock": -10,
        "category": "Nike"
    }
    let productEmptyValue = {
        "name": "",
        "image_url": "",
        "price": "",
        "stock": "",
        "category": ""
    };
    let productWrongFormat = {
        "name": "Liverpool 1st jersey-player",
        "image_url": "https://www.soccerpro.com/wp-content/uploads/cz2625_687_nike_liverpool_home_match_jsy_2020_21_01.jpg",
        "price": 'Rp. 1.600.000',
        "stock": '10 buah',
        "category": "Nike"
    };
    beforeAll((done) => {
        User.findOne({
            where: {
                email: "admin@mail.com",
            }
        })
            .then((data) => {
                access_token = signToken({ id: data.id, email: data.email })
                productUser = data
                return User.findOne({
                    where: {
                        email: "xxx@gmail.com",
                    }
                })
            })
            .then(data2 => {
                access_token1 = signToken({ id: data2.id, email: data2.email })
                return Product.create({
                    "name": "Liverpool 1st jersey-player",
                    "image_url": "https://www.soccerpro.com/wp-content/uploads/cz2625_687_nike_liverpool_home_match_jsy_2020_21_01.jpg",
                    "price": 1600000,
                    "stock": 10,
                    "category": "Nike",
                    UserId: productUser.id
                })
            })
            .then(result => {
                product = result
                done()
            })
            .catch((err) => {
                done()
            })
        })
        test('Successfully add product', (done) => {
            request(app)
            .post('/products')
            .set('access_token', access_token)
            .send(newProduct)
            .set('accept', 'application/json')
        .then(response => {
            const { status, body } = response
            expect(status).toBe(201)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('name', newProduct.name)
            expect(body).toHaveProperty('image_url', newProduct.image_url)
            expect(body).toHaveProperty('price', newProduct.price)
            expect(body).toHaveProperty('stock', newProduct.stock)
            expect(body).toHaveProperty('category', newProduct.category)
            done()
        })
})
test('add Product no token', (done) => {
    request(app)
        .post('/products')
        .set('accept', 'application/json')
        .then(response => {
            const { status, body } = response
            expect(status).toBe(401)
            expect(body).toHaveProperty('message', 'Access token is empty.')
            done()
        })
})
test('add Product fail token', (done) => {
    request(app)
        .post('/products')
        .set('access_token', access_token1)
        .set('accept', 'application/json')
        .then(response => {
            const { status, body } = response
            expect(status).toBe(403)
            expect(body).toHaveProperty('message', 'You cannot access.')
            done()
        })
})
test('Empty product', (done) => {
    request(app)
        .post('/products')
        .set('access_token', access_token)
        .send(productEmptyValue)
        .set('accept', 'application/json')
        .then(response => {
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty("message",
                [
                    "Name must be filled.",
                    "Image must be filled.",
                    "Price must be filled.",
                    "Price must have number.",
                    "Stock must be filled."
                ]);
            done();
        })
})
test('Negative value', (done) => {
    request(app)
        .post('/products')
        .set('access_token', access_token)
        .send(productNegativeValue)
        .set('accept', 'application/json')
        .then(response => {
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty("message",
                [
                    "Price must have positive value.",
                    "Stock must have positive value."
                ]);
            done();
        })
})
test('String value', (done) => {
    request(app)
        .post('/products')
        .set('access_token', access_token)
        .send(productWrongFormat)
        .set('accept', 'application/json')
        .then(response => {
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty("message",
                [
                    "Price must have number.",
                    "Stock must have number.",
                ]);
            done();
        })
})
test('Update product no token', (done) => {
    request(app)
        .put(`/products/${product.id}`)
        .set('accept', 'application/json')
        .then(response => {
            const { status, body } = response
            expect(status).toBe(401)
            expect(body).toHaveProperty('message', 'Access token is empty.')
            done()
        })
})
    test('Update product fail token', (done) => {
        request(app)
            .put(`/products/${product.id}`)
            .set('access_token', access_token1)
            .set('accept', 'application/json')
            .then(response => {
                    const { status, body } = response
                expect(status).toBe(403)
                expect(body).toHaveProperty('message', 'You cannot access.')
                done()
            })
    })
    test('Empty product', (done) => {
        request(app)
            .put(`/products/${product.id}`)
            .set('access_token', access_token)
            .send(productEmptyValue)
            .set('accept', 'application/json')
            .then(response => {
                    const { status, body } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty("message",
                    [
                        "Name must be filled.",
                        "Image must be filled.",
                        "Price must be filled.",
                        "Price must have number.",
                        "Stock must be filled."
                    ]);
                done();
            })
    })
    test('Negative value', (done) => {
        request(app)
            .put(`/products/${product.id}`)
            .set('access_token', access_token)
            .send(productNegativeValue)
            .set('accept', 'application/json')
            .then(response => {
                    const { status, body } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty("message",
                    [
                            "Price must have positive value.",
                        "Stock must have positive value."
                    ]);
                done();
            })
    })
    test('String value', (done) => {
            request(app)
            .put(`/products/${product.id}`)
            .set('access_token', access_token)
            .send(productWrongFormat)
            .set('accept', 'application/json')
            .then(response => {
                const { status, body } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty("message",
                    [
                        "Price must have number.",
                        "Stock must have number.",
                    ]);
                done();
            })
    })
    test('delete Product no token', (done) => {
        request(app)
            .delete(`/products/${product.id}`)
            .set('accept', 'application/json')
            .then(response => {
                const { status, body } = response
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'Access token is empty.')
                done()
            })
    })
    test('delete Product fail token', (done) => {
        request(app)
            .delete(`/products/${product.id}`)
            .set('access_token', access_token1)
            .set('accept', 'application/json')
            .then(response => {
                const { status, body } = response
                expect(status).toBe(403)
                expect(body).toHaveProperty('message', 'You cannot access.')
                done()
            })
    })

})


afterAll((done) => {
    queryInterface.bulkDelete('Products')
        .then(() => {
            done()
        })
        .catch(err => {
            console.log(err)
            done()
        })
})