const request = require('supertest')
const app = require('../app')
const {sequelize} = require('../models')
const {queryInterface} = sequelize
const {signToken} = require('../helpers/jwt')
const {Admin} = require('../models/index')

let access_token
let id

beforeAll((done) => {
    Admin.findOne({
        where: {
            email: 'admin@mail.com'
        }
    })
    .then(admin => {
        access_token = signToken({
            id: admin.id,
            email: admin.email,
            role: admin.role
        })
        done()
    })
    .catch(err => {
        done()
    })
}) 

afterAll((done) => {
    queryInterface.bulkDelete('Products')
    .then(() => {
        done()
    })
    .catch(err => {
        done()
    })
})


describe('Test Endpoint POST /product', () => {
    it('Test add product success', (done) => {
        request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({name: 'Birkenstock', image_url: 'shorturl.at/axDWX', price: 700000, stock: 10})
        .then(response => {
            let {body, status} = response
            expect(status).toEqual(201)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('name', 'Birkenstock')
            expect(body).toHaveProperty('image_url', 'shorturl.at/axDWX')
            expect(body).toHaveProperty('price', 700000)
            expect(body).toHaveProperty('stock', 10)
            id = body.id
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('Test add product with no access token', (done) => {
        request(app)
        .post('/products')
        .send({name: 'Birkenstock', image_url: 'shorturl.at/axDWX', price: 700000, stock: 10})
        .then(response => {
            let {body, status} = response
            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'User unauthorized')
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('Test add product with wrong role', (done) => {
        request(app)
        .post('/products')
        .set('access_token', signToken({
            id: 4,
            email: 'hutamy@mail.com',
            role: 'customer'
        }))
        .send({name: 'Birkenstock', image_url: 'shorturl.at/axDWX', price: 700000, stock: 10})
        .then(response => {
            let {body, status} = response
            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'User unauthorized')
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('Test add product fail, empty field', (done) => {
        request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({name: '', image_url: '', price: '', stock: ''})
        .then(response => {
            let {body, status} = response
            expect(status).toEqual(400)
            expect(body).toHaveProperty('msg', expect.any(String))
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('Test add product fail, price below 0', (done) => {
        request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({name: 'Birkenstock', image_url: 'shorturl.at/axDWX', price: -1, stock: 10})
        .then(response => {
            let {body, status} = response
            expect(status).toEqual(400)
            expect(body).toHaveProperty('msg', expect.any(String))
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('Test add product fail, stock below 0', (done) => {
        request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({name: 'Birkenstock', image_url: 'shorturl.at/axDWX', price: 700000, stock: -5})
        .then(response => {
            let {body, status} = response
            expect(status).toEqual(400)
            expect(body).toHaveProperty('msg', expect.any(String))
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('Test add product fail, wrong data type', (done) => {
        request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({name: 15, image_url: 'shorturl.at/axDWX', price: 'satu', stock: 10})
        .then(response => {
            let {body, status} = response
            expect(status).toEqual(500)
            expect(body).toHaveProperty('msg', expect.any(String))
            done()
        })
        .catch(err => {
            done(err)
        })
    })
})



describe('Test Endpoint PUT/product/:id', () => {
    it('Test edit product success', (done) => {
        request(app)
        .put(`/products/${id}`)
        .set('access_token', access_token)
        .send({name: 'Vans Old Skool', image_url: 'shorturl.at/axDWX', price: 700000, stock: 10})
        .then(response => {
            let {body, status} = response
            expect(status).toEqual(200)
            expect(body).toHaveProperty('msg', 'Sucessfully update product')
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('Test edit product failed, no access token', (done) => {
        request(app)
        .put(`/products/${id}`)
        .send({name: 'Vans Old Skool', image_url: 'shorturl.at/axDWX', price: 700000, stock: 10})
        .then(response => {
            let {body, status} = response
            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'User unauthorized')
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('Test edit product failed, role is not admin', (done) => {
        request(app)
        .put(`/products/${id}`)
        .set('access_token', signToken({
            id: 4,
            email: 'hutamy@mail.com',
            role: 'customer'
        }))
        .send({name: 'Vans Old Skool', image_url: 'shorturl.at/axDWX', price: 700000, stock: 10})
        .then(response => {
            let {body, status} = response
            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'User unauthorized')
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('Test edit product failed, id not found', (done) => {
        request(app)
        .put(`/products/1110`)
        .set('access_token', access_token)
        .send({name: 'Vans Old Skool', image_url: 'shorturl.at/axDWX', price: 700000, stock: 10})
        .then(response => {
            let {body, status} = response
            expect(status).toEqual(404)
            expect(body).toHaveProperty('msg', 'Error Not Found')
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('Test edit empty input', (done) => {
        request(app)
        .put(`/products/${id}`)
        .set('access_token', access_token)
        .send({name: '', image_url: '', price: '', stock: ''})
        .then(response => {
            let {body, status} = response
            expect(status).toEqual(400)
            expect(body).toHaveProperty('msg', expect.any(String))
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('Test edit product fail, price below 0', (done) => {
        request(app)
        .put(`/products/${id}`)
        .set('access_token', access_token)
        .send({name: 'Birkenstock', image_url: 'shorturl.at/axDWX', price: -1, stock: 10})
        .then(response => {
            let {body, status} = response
            expect(status).toEqual(400)
            expect(body).toHaveProperty('msg', expect.any(String))
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('Test edit product fail, stock below 0', (done) => {
        request(app)
        .put(`/products/${id}`)
        .set('access_token', access_token)
        .send({name: 'Birkenstock', image_url: 'shorturl.at/axDWX', price: 700000, stock: -1})
        .then(response => {
            let {body, status} = response
            expect(status).toEqual(400)
            expect(body).toHaveProperty('msg', expect.any(String))
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('Test edit product fail, wrong data type', (done) => {
        request(app)
        .put(`/products/${id}`)
        .set('access_token', access_token)
        .send({name: 15, image_url: 'shorturl.at/axDWX', price: 'satu', stock: 10})
        .then(response => {
            let {body, status} = response
            expect(status).toEqual(500)
            expect(body).toHaveProperty('msg', expect.any(String))
            done()
        })
        .catch(err => {
            done(err)
        })
    })
})



describe('Test Endpoint GET /product', () => {
    it('Test view all product success', (done) => {
        request(app)
        .get('/products')
        .set('access_token', access_token)
        .then(response => {
            let {body, status} = response
            expect(status).toEqual(200)
            expect(body).toEqual(expect.arrayContaining([
                expect.objectContaining({id: expect.any(Number)}),
                expect.objectContaining({name: expect.any(String)}),
                expect.objectContaining({image_url: expect.any(String)}),
                expect.objectContaining({price: expect.any(Number)}),
                expect.objectContaining({stock: expect.any(Number)})
            ]))
            done()
        })
        .catch(err => {
            done(err)
        })
    })
})


describe('Test delete product', () => {
    it('Test delete success', (done) => {
        request(app)
        .delete(`/products/${id}`)
        .set('access_token', access_token)
        .then(response => {
            let {body, status} = response
            expect(status).toEqual(200)
            expect(body).toHaveProperty('msg', 'Sucessfully delete product')
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('Test delete failed, no access token', (done) => {
        request(app)
        .delete(`/products/${id}`)
        .then(response => {
            let {body, status} = response
            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'User unauthorized')
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('Test delete failed, wrong role', (done) => {
        request(app)
        .delete(`/products/${id}`)
        .set('access_token', signToken({
            id: 4,
            email: 'hutamy@mail.com',
            role: 'customer'
        }))
        .then(response => {
            let {body, status} = response
            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'User unauthorized')
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('Test delete id not found', (done) => {
        request(app)
        .delete(`/products/999999`)
        .set('access_token', access_token)
        .then(response => {
            let {body, status} = response
            expect(status).toEqual(404)
            expect(body).toHaveProperty('msg', 'Error Not Found')
            done()
        })
        .catch(err => {
            done(err)
        })
    })
})