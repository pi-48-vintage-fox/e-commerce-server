const request = require('supertest')
const { response } = require('../app')
const app = require('../app')
// const { sequelize } = require('../models')
// const { queryInterface } = sequelize

describe('Test Endpoint POST/login', () => {

  it('Test login success', (done) => {
    request(app)
      .post('/login')
      .send({ email: "admin@mail.com", password: "qwerty" })
      .then(response => {
        let { body, status } = response
        expect(status).toBe(200)
        expect(body).toHaveProperty("message", "Login Success")
        expect(body).toHaveProperty('access_token', expect.any(String))
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('Test login wrong email/password', (done) => {
    request(app)
      .post('/login')
      .send({ email: 'adminnnn@mail.com', password: 'qwertyyyyy' })
      .then(response => {
        let { body, status } = response
        expect(status).toEqual(401)
        expect(body).toHaveProperty('message', 'Wrong email/password')
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('Test login wrong email', (done) => {
    response(app)
      .post('/login')
      .send({ email: 'adminnnnn@mail.com', password: 'qwerty' })
      .then(response => {
        let { body, status } = response
        expect(status).toEqual(401)
        expect(body).toHaveProperty('message', 'Wrong email/password')
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('Test login no email and password', (done) => {
    request(app)
      .post('/login')
      .send({ email: '', password: '' })
      .then(response => {
        let { body, status } = response
        expect(status).toEqual(400)
        expect(body).toHaveProperty('message', 'Wrong email/password')
        done()
      })
      .catch(err => {
        done(err)
      })
  })

})

describe('Test Endpoint POST/login', () => {

  it('Test register success', (done) => {
    request(app)
      .post('/register')
      .send({ email: "test@mail.com", password: "test123" })
      .then(response => {
        let { body, status } = response
        expect(status).toBe(200)
        expect(body).toHaveProperty("message", "user Created")
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('Test register no email and password', (done) => {
    request(app)
      .post('/register')
      .send({ email: "", password: "" })
      .then(response => {
        let { body, status } = response
        let expectedMessages = ["Email Is required", "Password Is required"]
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", expect.arrayContaining(expectedMessages))
      })
      .catch(err => {
        done(err)
      })
  })

})