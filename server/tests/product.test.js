const request = require('supertest')
const app = require('../app')
const { User, sequelize } = require('../models/index')
const { signToken } = require('../helpers/jwt')
const { response } = require('express')
const { queryInterface } = sequelize
let access_token= ''
let id = 0
let tokenNotAdmin = ''

beforeAll((done) => {
  User.findOne({
    where: {
      email: 'admin@mail.com'
    }
  })
  .then(data => {
    console.log(data);
    access_token = signToken({
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
  queryInterface.bulkDelete('Products')
  .then(() => {
    done()
  })
  .catch(err => {
    done(err)
  })
})

describe('Testing Add Product /POST', () => {
  it('Success add product', (done) => {
    request(app)
    .post('/products')
    .set('access_token', access_token)
    .send({
      name: 'Oronamin C',
      image_url: 'https://www.google.com/aclk?sa=l&ai=DChcSEwj4hcrWjvnsAhUJ3EwCHf4vBEoYABAOGgJ0bQ&sig=AOD64_22WSGC5bniQcaFwI5viyjFO4lfDg&adurl&ctype=5&ved=2ahUKEwie477WjvnsAhWkU3wKHXfzDagQvhd6BAgBEEY',
      price: 8000,
      stock: 300
    })
    .then(response => {
      const { body, status } = response
      id = body.id
      expect(status).toEqual(201)
      expect(body).toHaveProperty('id', expect.any(Number))
      expect(body).toHaveProperty('name', 'Oronamin C')
      expect(body).toHaveProperty('image_url', 'https://www.google.com/aclk?sa=l&ai=DChcSEwj4hcrWjvnsAhUJ3EwCHf4vBEoYABAOGgJ0bQ&sig=AOD64_22WSGC5bniQcaFwI5viyjFO4lfDg&adurl&ctype=5&ved=2ahUKEwie477WjvnsAhWkU3wKHXfzDagQvhd6BAgBEEY')
      expect(body).toHaveProperty('price', 8000)
      expect(body).toHaveProperty('stock', 300)
      done()
    })
    .catch(err => {
      done(err)
    })
  })

  it('Fail add product, access token is not defined', (done) => {
    request(app)
    .post('/products')
    .send({
      name: 'Oronamin C',
      image_url: 'https://www.google.com/aclk?sa=l&ai=DChcSEwj4hcrWjvnsAhUJ3EwCHf4vBEoYABAOGgJ0bQ&sig=AOD64_22WSGC5bniQcaFwI5viyjFO4lfDg&adurl&ctype=5&ved=2ahUKEwie477WjvnsAhWkU3wKHXfzDagQvhd6BAgBEEY',
      price: 8000,
      stock: 300
    })
    .then(response => {
      const { body, status } = response
      expect(status).toEqual(400)
      expect(body).toHaveProperty("message", "Wrong Email/password!")
      done()
    })
    .catch(err => {
      done(err)
    })
  })

  // it('Fail add product, Role not admin', (done) => {
  //   // Not role admin
  // })

  it('Fail add product, required cannot be empty', (done) => {
    request(app)
    .post('/products')
    .set('access_token', access_token)
    .send({
      name: '',
      image_url: 'https://www.google.com/aclk?sa=l&ai=DChcSEwj4hcrWjvnsAhUJ3EwCHf4vBEoYABAOGgJ0bQ&sig=AOD64_22WSGC5bniQcaFwI5viyjFO4lfDg&adurl&ctype=5&ved=2ahUKEwie477WjvnsAhWkU3wKHXfzDagQvhd6BAgBEEY',
      price: 8000,
      stock: 300
    })
    .then(response => {
      const { body, status } = response
      expect(status).toEqual(400)
      expect(body).toHaveProperty('message', "Field Cannot be empty!")
      done()
    })
    .catch(err => {
      done(err)
    })
  })

  it('Fail add product, price or stock cannot less than 0', (done) => {
    request(app)
    .post('/products')
    .set('access_token', access_token)
    .send({
      name: 'Oronamin C',
      image_url: 'https://www.google.com/aclk?sa=l&ai=DChcSEwj4hcrWjvnsAhUJ3EwCHf4vBEoYABAOGgJ0bQ&sig=AOD64_22WSGC5bniQcaFwI5viyjFO4lfDg&adurl&ctype=5&ved=2ahUKEwie477WjvnsAhWkU3wKHXfzDagQvhd6BAgBEEY',
      price: 8000,
      stock: -1
    })
    .then(response => {
      const { body, status } = response
      expect(status).toEqual(400)
      expect(body).toHaveProperty('message', "Price or stock must be more than 0")
      done()
    })
    .catch(err => {
      done(err)
    })
  })

  it('Fail add product, Incorrect data type', (done) => {
    request(app)
    .post('/products')
    .set('access_token', access_token)
    .send({
      name: 'Oronamin C',
      image_url: 'https://www.google.com/aclk?sa=l&ai=DChcSEwj4hcrWjvnsAhUJ3EwCHf4vBEoYABAOGgJ0bQ&sig=AOD64_22WSGC5bniQcaFwI5viyjFO4lfDg&adurl&ctype=5&ved=2ahUKEwie477WjvnsAhWkU3wKHXfzDagQvhd6BAgBEEY',
      price: "'8000'",
      stock: 300
    })
    .then(response => {
      const { body, status } = response
      expect(status).toEqual(400)
      expect(body).toHaveProperty('message', "Incorret data type (string/number)")
      done()
    })
    .catch(err => {
      done(err)
    })
  })
})


describe('Testing edit product /PUT', () => {
  it('Success edit product', (done) => {
    request(app)
    .put(`/products/${id}`)
    .set('access_token', access_token)
    .send({
      name: 'Oronamin-C',
      image_url: 'https://www.google.com/aclk?sa=l&ai=DChcSEwj4hcrWjvnsAhUJ3EwCHf4vBEoYABAOGgJ0bQ&sig=AOD64_22WSGC5bniQcaFwI5viyjFO4lfDg&adurl&ctype=5&ved=2ahUKEwie477WjvnsAhWkU3wKHXfzDagQvhd6BAgBEEY',
      price: 8000,
      stock: 100
    })
    .then(response => {
      const { body, status } = response
      expect(status).toEqual(200)
      expect(body).toHaveProperty('name', 'Oronamin-C')
      expect(body).toHaveProperty('image_url', 'https://www.google.com/aclk?sa=l&ai=DChcSEwj4hcrWjvnsAhUJ3EwCHf4vBEoYABAOGgJ0bQ&sig=AOD64_22WSGC5bniQcaFwI5viyjFO4lfDg&adurl&ctype=5&ved=2ahUKEwie477WjvnsAhWkU3wKHXfzDagQvhd6BAgBEEY')
      expect(body).toHaveProperty('price', 8000)
      expect(body).toHaveProperty('stock', 100)
      done()
    })
    .catch(err => {
      done(err)
    })
  })

  it('Fail edit product, access token is not defined', (done) => {
    request(app)
    .put(`/products/${id}`)
    .send({
      name: 'Oronamin-C',
      image_url: 'https://www.google.com/aclk?sa=l&ai=DChcSEwj4hcrWjvnsAhUJ3EwCHf4vBEoYABAOGgJ0bQ&sig=AOD64_22WSGC5bniQcaFwI5viyjFO4lfDg&adurl&ctype=5&ved=2ahUKEwie477WjvnsAhWkU3wKHXfzDagQvhd6BAgBEEY',
      price: 8000,
      stock: 100
    })
    .then(response => {
      const { body, status } = response
      expect(status).toEqual(400)
      expect(body).toHaveProperty("message", "Wrong Email/password!")
      done()
    })
    .catch(err => {
      done(err)
    })
  })

  it('Fail edit product, price or stock cannot less than 0', (done) => {
    request(app)
    .put(`/products/${id}`)
    .set('access_token', access_token)
    .send({
      name: 'Oronamin-C',
      image_url: 'https://www.google.com/aclk?sa=l&ai=DChcSEwj4hcrWjvnsAhUJ3EwCHf4vBEoYABAOGgJ0bQ&sig=AOD64_22WSGC5bniQcaFwI5viyjFO4lfDg&adurl&ctype=5&ved=2ahUKEwie477WjvnsAhWkU3wKHXfzDagQvhd6BAgBEEY',
      price: 8000,
      stock: -1
    })
    .then(response => {
      const { body, status } = response
      expect(status).toEqual(400)
      expect(body).toHaveProperty('message', "Price or stock must be more than 0")
      done()
    })
    .catch(err => {
      done(err)
    })
  })

  it('Fail edit product, Incorrect data type', (done) => {
    request(app)
    .put(`/products/${id}`)
    .set('access_token', access_token)
    .send({
      name: 'Oronamin-C',
      image_url: 'https://www.google.com/aclk?sa=l&ai=DChcSEwj4hcrWjvnsAhUJ3EwCHf4vBEoYABAOGgJ0bQ&sig=AOD64_22WSGC5bniQcaFwI5viyjFO4lfDg&adurl&ctype=5&ved=2ahUKEwie477WjvnsAhWkU3wKHXfzDagQvhd6BAgBEEY',
      price: "'8000'",
      stock: 100
    })
    .then(response => {
      const { body, status } = response
      expect(status).toEqual(400)
      expect(body).toHaveProperty('message', "Incorret data type (string/number)")
      done()
    })
    .catch(err => {
      done(err)
    })
  })

})


describe('Testing delete product /DELETE', () => {
  it('Success delete product', (done) => {
    request(app)
    .delete(`/products/${id}`)
    .set('access_token', access_token)
    .then(response => {
      const { body, status } = response
      expect(status).toEqual(200)
      expect(body).toHaveProperty('message', 'Success delete product')
      done()
    })
    .catch(err => {
      done(err)
    })
  })

  it('Fail delete product, access token is not defined', (done) => {
    request(app)
    .delete(`/products/${id}`)
    .then(response => {
      const { body, status } = response
      expect(status).toEqual(400)
      expect(body).toHaveProperty("message", "Wrong Email/password!")
      done()
    })
    .catch(err => {
      done(err)
    })
  })
})