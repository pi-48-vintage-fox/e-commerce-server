const { beforeAll } = require('@jest/globals')
const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { User } = require('../models')

describe('POST /login', () => {
  it('successfully logins user', (done) => {
    request(app)
      .post('/login')
      .send({ email: 'admin@mail.com', password: '1234' })
      .then((response) => {
        const { body, status } = response
        console.log(body, '<<<< response dari POST login')

        expect(status).toEqual(200)
        expect(body).toHaveProperty('access_token', expect.any(String))
        done()
      })
      .catch((err) => {
        console.log(err)
        done()
      })
  })

  it('fails user login (invalid email/password', (done) => {
    request(app)
      .post('/login')
      .send({ email: 'budi@mail.com', password: '1' })
      .then((response) => {
        const { status, body } = response
        expect(status).toEqual(404)
      })
      .catch((err) => {
        console.log(err)
      })
  })
})
