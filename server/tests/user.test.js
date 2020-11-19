const request = require('supertest')
const app = require('../app')
const { User, sequelize } = require('../models/index')
const { signToken } = require('../helpers/jwt')
const { queryInterface } = sequelize


describe("Post /login", () => {
  test("Login Successfully", (done) => {
    const obj = {
      email: 'admin@mail.com',
      password: '54321'
    }
    request(app)
      .post('/login')
      .send(obj)
      .then((response) => {
        const { status, body } = response
        expect(status).toBe(200)
        expect(body).toHaveProperty("access_token", expect.any(String))
        done()
      })
      .catch((err) => {
        done()
      })
  })


  test("Failed, Wrong password", (done) => {
    const obj = {
      email: 'admin@mail.com',
      password: '5432112345'
    }
    request(app)
      .post('/login')
      .send(obj)
      .then((response) => {
        const { status, body } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", "Wrong Email/password!")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test("Failed, Email doesn't exists", (done) => {
    const obj = {
      email: 'admingaul@mail.com',
      password: '54321'
    }
    request(app)
      .post('/login')
      .send(obj)
      .then((response) => {
        const { status, body } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", "Wrong Email/password!")
        done()
      })
      .catch((err) => {
        console.log(err);
        done(err)
      })
  })

  test("Failed, Required email or password", (done) => {
    const obj = {
      email: '',
      password: ''
    }
    request(app)
      .post('/login')
      .send(obj)
      .then((response) => {
        const { status, body } = response
        // console.log({body});
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", "Please required Email and password")
        done()
      })
      .catch((err) => {
        console.log(err);
        done(err)
      })
  })
})