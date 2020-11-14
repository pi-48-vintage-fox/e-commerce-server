const request = require('supertest')
const app = require('../app')
const { signToken } = require('../helpers/jwt')
const { Admin, Product } = require('../models/index')
// const {sequelize} = require('../models')
// const {queryInterface} = sequelize

let access_token
let access_token_customer
let id = 0
// afterAll((done) => {
//     queryInterface.bulkDelete('Products')
//     .then(() => {
//         done()
//     })
//     .catch(err => {
//         done()
//     }) 
// })

beforeAll((done) => {
    Admin.findOne({
        where: {
            email: 'sample@gmail.com'
        }
    })
    .then(admin => {
        access_token = signToken({
            id: admin.id,
            email: admin.email,
            role: admin.role
        })
        return Admin.findOne({
            where: {
                email: 'member@gmail.com'
            }
        })
    })
    .then(customer => {
        access_token_customer = signToken({
            id: customer.id,
            email: customer.email,
            role: customer.role
        })
        done()
    })
    .catch(err => {
        done(err)
    })
})

describe('POST /create', () => {
    // SUCCESS========================================================================
    it('Test create sukses', (done) => {
        request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({
            name: 'NIKE Mercurial',
            image_url: 'https://thumblr.uniid.it/product/188895/6223a335d145.jpg',
            price: 2000000,
            stock: 20,
            category: 'Frozen'
        })
        .then(response => {
            const { body, status } = response

            id = body.id
            expect(status).toEqual(201)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('name', 'NIKE Mercurial')
            expect(body).toHaveProperty('image_url', 'https://thumblr.uniid.it/product/188895/6223a335d145.jpg')
            expect(body).toHaveProperty('price', 2000000)
            expect(body).toHaveProperty('stock', 20)
            expect(body).toHaveProperty('category', 'Frozen')
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    // FAILED========================================================================
    it('Test tidak menyertakan access_token', (done) => {
        request(app)
        .post('/products')
        .send({
            name: 'NIKE Mercurial',
            image_url: 'https://thumblr.uniid.it/product/188895/6223a335d145.jpg',
            price: 2000000,
            stock: 20,
            category: 'Frozen'
        })
        .then(response => {
            let { body, status } = response

            expect(status).toEqual(401)
            expect(body).toHaveProperty('err', 'Authentication Failed')  
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('Test menyertakan access_token tapi bukan punya admin', (done) => {
        request(app)
        .post('/products')
        .set('access_token', access_token_customer)
        .send({
            name: 'NIKE Mercurial',
            image_url: 'https://thumblr.uniid.it/product/188895/6223a335d145.jpg',
            price: 2000000,
            stock: 20,
            category: 'Frozen'
        })
        .then(response => {
            let { body, status } = response

            expect(status).toEqual(403)
            expect(body).toHaveProperty('err', `You don't have an access`)  
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('Test field yang required tidak diisi', (done) => {
        request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({
            name: '',
            image_url: '',
            price: 2000000,
            stock: 20,
            category: 'Frozen'
        })
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(400)
            expect(body).toHaveProperty('message', 'Name is required')  
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('Test stock diisi angka minus', (done) => {
        request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({
            name: 'NIKE Mercurial',
            image_url: 'https://thumblr.uniid.it/product/188895/6223a335d145.jpg',
            price: 2000000,
            stock: -7,
            category: 'Frozen'
        })
        .then(response => {
            let { body, status } = response

            expect(status).toEqual(400)
            expect(body).toHaveProperty('message', 'Validation min on stock failed')  
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('Test price diisi angka minus', (done) => {
        request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({
            name: 'NIKE Mercurial',
            image_url: 'https://thumblr.uniid.it/product/188895/6223a335d145.jpg',
            price: -1000,
            stock: 20,
            category: 'Frozen'
        })
        .then(response => {
            let { body, status } = response

            expect(status).toEqual(400)
            expect(body).toHaveProperty('message', 'Validation min on price failed')  
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('Test field diisi tipe data tidak sesuai', (done) => {
        request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({
            name: 'NIKE Mercurial',
            image_url: 'https://thumblr.uniid.it/product/188895/6223a335d145.jpg',
            price: 2000000,
            stock: 'apasih',
            category: 'Frozen'
        })
        .then(response => {
            let { body, status } = response

            expect(status).toEqual(400)
            expect(body).toHaveProperty('message', 'Validation isNumeric on stock failed')  
            done()
        })
        .catch(err => {
            done(err)
        })
    })
})

describe('PUT /update', () => {
    // SUCCESS========================================================================
    it('Test update sukses', (done) => {
        request(app)
        .put(`/products/${id}`)
        .set('access_token', access_token)
        .send({
            name: 'NIKE Mercurial Vapor',
            image_url: 'https://thumblr.uniid.it/product/188895/6223a335d145.jpg',
            price: 2000000,
            stock: 5,
            category: 'Frozen'
        })
        .then(response => {
            let { body, status } = response

            expect(status).toEqual(200)
            expect(body).toHaveProperty('message', 'Product has been updated')
            done()
        })
        .catch(err => {
            done(err)
        })

    })

    // FAILED========================================================================
    it('Test tidak menyertakan access_token', (done) => {
        request(app)
        .put(`/products/${id}`)
        .send({
            name: 'NIKE Mercurial Vapor',
            image_url: 'https://thumblr.uniid.it/product/188895/6223a335d145.jpg',
            price: 2000000,
            stock: 20,
            category: 'Frozen'
        })
        .then(response => {
            let { body, status } = response

            expect(status).toEqual(401)
            expect(body).toHaveProperty('err', 'Authentication Failed')  
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('Test menyertakan access_token tapi bukan punya admin', (done) => {
        request(app)
        .put(`/products/${id}`)
        .set('access_token', access_token_customer)
        .send({
            name: 'NIKE Mercurial Vapor',
            image_url: 'https://thumblr.uniid.it/product/188895/6223a335d145.jpg',
            price: 2000000,
            stock: 20,
            category: 'Frozen'
        })
        .then(response => {
            let { body, status } = response

            expect(status).toEqual(403)
            expect(body).toHaveProperty('err', `You don't have an access`)  
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('Test stock diisi angka minus', (done) => {
        request(app)
        .put(`/products/${id}`)
        .set('access_token', access_token)
        .send({
            name: 'NIKE Mercurial Vapor',
            image_url: 'https://thumblr.uniid.it/product/188895/6223a335d145.jpg',
            price: 2000000,
            stock: -7,
            category: 'Frozen'
        })
        .then(response => {
            let { body, status } = response

            expect(status).toEqual(400)
            expect(body).toHaveProperty('message', 'Validation min on stock failed')  
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('Test price diisi angka minus', (done) => {
        request(app)
        .put(`/products/${id}`)
        .set('access_token', access_token)
        .send({
            name: 'NIKE Mercurial Vapor',
            image_url: 'https://thumblr.uniid.it/product/188895/6223a335d145.jpg',
            price: -1000,
            stock: 20,
            category: 'Frozen'
        })
        .then(response => {
            let { body, status } = response

            expect(status).toEqual(400)
            expect(body).toHaveProperty('message', 'Validation min on price failed')  
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('Test field diisi tipe data tidak sesuai', (done) => {
        request(app)
        .put(`/products/${id}`)
        .set('access_token', access_token)
        .send({
            name: 'NIKE Mercurial Vapor',
            image_url: 'https://thumblr.uniid.it/product/188895/6223a335d145.jpg',
            price: 2000000,
            stock: 'apasih',
            category: 'Frozen'
        })
        .then(response => {
            let { body, status } = response

            expect(status).toEqual(400)
            expect(body).toHaveProperty('message', 'Validation isNumeric on stock failed')  
            done()
        })
        .catch(err => {
            done(err)
        })
    })
})

describe('DELETE /delete', () => {
    // SUCCESS========================================================================
    it('Test delete sukses', (done) => {
        request(app)
        .delete(`/products/${id}`)
        .set('access_token', access_token)
        .then(response => {
            let { body, status } = response

            expect(status).toEqual(200)
            expect(body).toHaveProperty('message', 'Product has been deleted')  
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    // FAILED========================================================================
    it('Test tidak menyertakan access_token', (done) => {
        request(app)
        .delete(`/products/${id}`)
        .send({
            name: 'NIKE Mercurial Vapor',
            image_url: 'https://thumblr.uniid.it/product/188895/6223a335d145.jpg',
            price: 2000000,
            stock: 20,
            category: 'Frozen'
        })
        .then(response => {
            let { body, status } = response

            expect(status).toEqual(401)
            expect(body).toHaveProperty('err', 'Authentication Failed')  
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('Test menyertakan access_token tapi bukan punya admin', (done) => {
        request(app)
        .delete(`/products/${id}`)
        .set('access_token', access_token_customer)
        .send({
            name: 'NIKE Mercurial Vapor',
            image_url: 'https://thumblr.uniid.it/product/188895/6223a335d145.jpg',
            price: 2000000,
            stock: 20,
            category: 'Frozen'
        })
        .then(response => {
            let { body, status } = response

            expect(status).toEqual(403)
            expect(body).toHaveProperty('err', `You don't have an access`)  
            done()
        })
        .catch(err => {
            done(err)
        })
    })


})