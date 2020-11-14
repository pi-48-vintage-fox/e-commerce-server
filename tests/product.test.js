const request = require("supertest")
const app = require('../app')
const { hashPass } = require("../helpers/bcrypt")
const { loginToken } = require("../helpers/jwt")
const { sequelize } = require('../models/index')
const { queryInterface } = sequelize
const { User, Product } = require('../models/index')

let access_token = ""
let customer_token = ""
let id

beforeAll((done) => {
    let admin = {
      email: "admin@mail.com",
      password: "123456"
    }
    let customer = {
      email: "member@mail.com",
      password: "haha"
    }
    User.create(admin)
    .then(data => {
      access_token = loginToken({
        id: data.id,
        email: data.email
      })
      return User.create(customer)
    })
    .then(data => {
      customer_token = loginToken({
        id: data.id,
        email: data.email
      })
      done()
    })
    .catch(err => {
      done(err)
    })
})
afterAll((done) => {
    queryInterface.bulkDelete("Products")
        .then(() => {
        return queryInterface.bulkDelete("Users")
        })
        .then(() => {
        done()
        })
        .catch((err) => {
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
            name: 'Craftopia',
            image_url: 'https://steamcdn-a.akamaihd.net/steam/apps/1307550/header.jpg?t=1602802037',
            price: 200000,
            stock: 20,
            category: "Game"
        })
        .then(response => {
            const { body, status } = response

            id = body.id
            expect(status).toEqual(201)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('name', 'Craftopia')
            expect(body).toHaveProperty('image_url', 'https://steamcdn-a.akamaihd.net/steam/apps/1307550/header.jpg?t=1602802037')
            expect(body).toHaveProperty('price', 200000)
            expect(body).toHaveProperty('stock', 20)
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
            name: 'Craftopia',
            image_url: 'https://steamcdn-a.akamaihd.net/steam/apps/1307550/header.jpg?t=1602802037',
            price: 200000,
            stock: 20,
            category: "Game"
        })
        .then(response => {
            let { body, status } = response

            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'Please log in first')  
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('Test menyertakan access_token tapi bukan punya admin', (done) => {
        request(app)
        .post('/products')
        .set('access_token', customer_token)
        .send({
            name: 'Craftopia',
            image_url: 'https://steamcdn-a.akamaihd.net/steam/apps/1307550/header.jpg?t=1602802037',
            price: 200000,
            stock: 20,
            category: "Game"
        })
        .then(response => {
            let { body, status } = response

            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', `Not Authorize to do that`)  
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
            stock: 20
        })
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(400)
            expect(body).toHaveProperty('msg', expect.any(Array))  
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
            name: 'Craftopia',
            image_url: 'https://steamcdn-a.akamaihd.net/steam/apps/1307550/header.jpg?t=1602802037',
            price: 200000,
            stock: -20,
            category: "Game"
        })
        .then(response => {
            let { body, status } = response

            expect(status).toEqual(400)
            expect(body).toHaveProperty('msg', ['Stock cannot below zero'])  
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
            name: 'Craftopia',
            image_url: 'https://steamcdn-a.akamaihd.net/steam/apps/1307550/header.jpg?t=1602802037',
            price: -200000,
            stock: 20,
            category: "Game"
        })
        .then(response => {
            let { body, status } = response

            expect(status).toEqual(400)
            expect(body).toHaveProperty('msg', ['Price cannot below zero'])  
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
            stock: 'wadidaw',
        })
        .then(response => {
            let { body, status } = response

            expect(status).toEqual(400)
            expect(body).toHaveProperty('msg', ['Please input numeric data'])  
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
            name: 'Craftopia',
            image_url: 'https://steamcdn-a.akamaihd.net/steam/apps/1307550/header.jpg?t=1602802037',
            price: 200000,
            stock: 20,
            category: "Game"
        })
        .then(response => {
            let { body, status } = response
            console.log(body);
            expect(status).toEqual(200)
            expect(body).toHaveProperty('msg', 'Product has been updated')
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
            name: 'Craftopia',
            image_url: 'https://steamcdn-a.akamaihd.net/steam/apps/1307550/header.jpg?t=1602802037',
            price: 200000,
            stock: 20,
            category: "Game"
        })
        .then(response => {
            let { body, status } = response

            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'Please log in first')  
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('Test menyertakan access_token tapi bukan punya admin', (done) => {
        request(app)
        .put(`/products/${id}`)
        .set('access_token', customer_token)
        .send({
            name: 'Craftopia',
            image_url: 'https://steamcdn-a.akamaihd.net/steam/apps/1307550/header.jpg?t=1602802037',
            price: 200000,
            stock: 20,
            category: "Game"
        })
        .then(response => {
            let { body, status } = response

            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', `Not Authorize to do that`)  
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
            name: 'Craftopia',
            image_url: 'https://steamcdn-a.akamaihd.net/steam/apps/1307550/header.jpg?t=1602802037',
            price: 200000,
            stock: -20,
            category: "Game"
        })
        .then(response => {
            let { body, status } = response

            expect(status).toEqual(400)
            expect(body).toHaveProperty('msg', ['Stock cannot below zero'])  
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
            name: 'Craftopia',
            image_url: 'https://steamcdn-a.akamaihd.net/steam/apps/1307550/header.jpg?t=1602802037',
            price: -200000,
            stock: 20,
            category: "Game"
        })
        .then(response => {
            let { body, status } = response

            expect(status).toEqual(400)
            expect(body).toHaveProperty('msg', ['Price cannot below zero'])
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
            name: 'Craftopia',
            image_url: 'https://steamcdn-a.akamaihd.net/steam/apps/1307550/header.jpg?t=1602802037',
            price: 200000,
            stock: "wadidaw",
            category: "Game"
        })
        .then(response => {
            let { body, status } = response

            expect(status).toEqual(400)
            expect(body).toHaveProperty('msg', ['Please input numeric data'])  
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
            expect(body).toHaveProperty('msg', 'Product has been deleted successfully')  
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
            name: 'Craftopia',
            image_url: 'https://steamcdn-a.akamaihd.net/steam/apps/1307550/header.jpg?t=1602802037',
            price: 200000,
            stock: "wadidaw",
            category: "Game"
        })
        .then(response => {
            let { body, status } = response

            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'Please log in first')  
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('Test menyertakan access_token tapi bukan punya admin', (done) => {
        request(app)
        .delete(`/products/${id}`)
        .set('access_token', customer_token)
        .send({
            name: 'Craftopia',
            image_url: 'https://steamcdn-a.akamaihd.net/steam/apps/1307550/header.jpg?t=1602802037',
            price: 200000,
            stock: "wadidaw",
            category: "Game"
        })
        .then(response => {
            let { body, status } = response

            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', `Not Authorize to do that`)  
            done()
        })
        .catch(err => {
            done(err)
        })
    })
})
