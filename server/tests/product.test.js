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
        console.log(err)
        done()
    })
}) 

// afterAll((done) => {
//     queryInterface.bulkDelete('Products')
//     .then(() => {
//         done()
//     })
//     .catch(err => {
//         done()
//     })
// })

describe('Test Endpoint GET /product', () => {
    it('Test view all product success', (done) => {
        request(app)
        .get('/product')
        .then(response => {
            let {body, status} = response
            expect(status).toEqual(200)
            expect(body).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    image_url: expect.any(String),
                    price: expect.any(Number),
                    stock: expect.any(Number)
                })
            ]))
            done()
        })
        .catch(err => {
            console.log(err)
            done()
        })
    })
})


describe('Test Endpoint POST /product', () => {
    it('Test add product success', (done) => {
        request(app)
        .post('/product')
        .set('access_token', access_token)
        .send({name: 'Birkenstock', image_url: 'shorturl.at/axDWX', price: 700000, stock: 10})
        .then(response => {
            let {body, status} = response
            expect(status).toEqual(200)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('name', 'Birkenstock')
            expect(body).toHaveProperty('image_url', 'shorturl.at/axDWX')
            expect(body).toHaveProperty('price', 700000)
            expect(body).toHaveProperty('stock', 10)
            id = body[id]
            done()
        })
        .catch(err => {
            console.log(err)
            done()
        })
    })

    it('Test add product fail, empty field', (done) => {
        request(app)
        .post('/product')
        .set('access_token', access_token)
        .send({name: '', image_url: '', price: 0, stock: 0})
        .then(response => {
            let {body, status} = response
            expect(status).toEqual(400)
            expect(body).toHaveProperty('msg', expect.any(String))
            done()
        })
        .catch(err => {
            console.log(err)
            done()
        })
    })
})

describe('Test Endpoint PUT/product/:id', () => {
    it('Test edit product success', (done) => {
        request(app)
        .put(`/product/${id}`)
        .set('access_token', access_token)
        .send({name: 'Vans Old Skool', image_url: 'shorturl.at/axDWX', price: 700000, stock: 10})
        .then(response => {
            let {body, status} = response
            expect(status).toEqual(200)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('name', 'Birkenstock')
            expect(body).toHaveProperty('image_url', 'shorturl.at/axDWX')
            expect(body).toHaveProperty('price', 700000)
            expect(body).toHaveProperty('stock', 10)
            done()
        })
        .catch(err => {
            console.log(err)
            done()
        })
    })

    it('Test edit product failed, id not found', (done) => {
        request(app)
        .put(`/product/1110`)
        .set('access_token', access_token)
        .send({name: 'Vans Old Skool', image_url: 'shorturl.at/axDWX', price: 700000, stock: 10})
        .then(response => {
            let {body, status} = response
            expect(status).toEqual(404)
            expect(body).toHaveProperty('msg', 'Error Not Found')
            done()
        })
        .catch(err => {
            console.log(err)
            done()
        })
    })

    it('Test edit empty input', (done) => {
        request(app)
        .put(`/product/${id}`)
        .set('access_token', access_token)
        .send({name: '', image_url: '', price: 0, stock: 0})
        .then(response => {
            let {body, status} = response
            expect(status).toEqual(400)
            expect(body).toHaveProperty('msg', expect.any(String))
            done()
        })
        .catch(err => {
            console.log(err)
            done()
        })
    })
})

describe('Test Endpoint PATCH/product/:id', () => {
    it('Test patch prodcut success', (done) => {
        request(app)
        .patch(`/product/${id}`)
        .set('access_token', access_token)
        .send({stock: 11})
        .then(response => {
            let {body, status} = response
            expect(status).toEqual(200)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('name', 'Birkenstock')
            expect(body).toHaveProperty('image_url', 'shorturl.at/axDWX')
            expect(body).toHaveProperty('price', 700000)
            expect(body).toHaveProperty('stock', 11)
            done()
        })
        .catch(err => {
            console.log(err)
            done()
        }) 
    })

    it('Test patch product failed, id not found', (done) => {
        request(app)
        .patch(`/product/${id}`)
        .set('access_token', access_token)
        .send({stock: 10})
        .then(response => {
            let {body, status} = response
            expect(status).toEqual(404)
            expect(body).toHaveProperty('msg', 'Error Not Found')
            done()
        })
        .catch(err => {
            console.log(err)
            done()
        })
    })

    it('Test patch product below 0', (done) => {
        request(app)
        .patch(`/product/${id}`)
        .set('access_token', access_token)
        .send({stock: -5})
        .then(response => {
            let {body, status} = response
            expect(status).toEqual(400)
            expect(body).toHaveProperty('msg', expect.any(String))
            done()
        })
        .catch(err => {
            console.log(err)
            done()
        })
    })
})

describe('Test delete product', () => {
    it('Test delete success', (done) => {
        request(app)
        .delete(`/product/${id}`)
        .set('access_token', access_token)
        .then(response => {
            let {body, status} = response
            expect(status).toEqual(200)
            expect(body).toHaveProperty('msg', 'Sucessfully delete product')
            done()
        })
        .catch(err => {
            console.log(err)
            done()
        })
    })

    it('Test delete id not found', (done) => {
        request(app)
        .delete(`/product/${id}`)
        .set('access_token', access_token)
        .then(response => {
            let {body, status} = response
            expect(status).toEqual(404)
            expect(body).toHaveProperty('msg', 'Error Not Found')
            done()
        })
        .catch(err => {
            console.log(err)
            done()
        })
    })
})