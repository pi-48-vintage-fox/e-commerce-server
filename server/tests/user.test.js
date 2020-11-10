const request = require('supertest')
const app = require('../app')
const { User, sequelize } = require('../models/index')
const { signToken } = require('../helpers/jwt')
const { queryInterface } = sequelize
// let access_token= ''

// beforeAll((done) => {
//   User.findOne({
//     where: {
//       email: 'admin@mail.com'
//     }
//   })
//   .then(data => {
//     access_token = signToken({
//       id: data.id,
//       email: data.email
//     })
//     done()
//   })
// })

// afterAll((done) => {
//   queryInterface.bulkDelete('Product')
//   .then(() => {
//     done()
//   })
//   .catch(err => {
//     console.log(err);
//     done()
//   })
// })

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
        expect(status).toBe(401)
        expect(body).toHaveProperty("message", "Wrong Email/password!")
        done()
      })
      .catch((err) => {
        console.log(err);
        done()
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
        expect(status).toBe(401)
        expect(body).toHaveProperty("message", "Wrong Email/password!")
        done()
      })
      .catch((err) => {
        console.log(err);
        done()
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
        expect(status).toBe(401)
        expect(body).toHaveProperty("message", "Wrong Email/password!")
        done()
      })
      .catch((err) => {
        console.log(err);
        done()
      })
  })
})