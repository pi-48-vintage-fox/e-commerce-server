const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

describe('Test Endpoint POST/register', () => {
  it('Test register success', (done) => {
    request(app)
      .post('/admin/register')
      .send({ email: 'admin@mail.com', password: 'qwerty' })
      .then(response => {
        let { body, status } = response
        expect(status).toEqual(200)
        expect(body).toHaveProperty('access_token', expect.any(String))
        expect(body).toHaveProperty('role', 'admin')
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
})