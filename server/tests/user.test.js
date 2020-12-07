const request = require('supertest')
const app = require('../app')

const userData = {
  email: 'admin@mail.com',
  password: 'qwerty',
}

const userData2 = {
  email: 'admin@mail.com',
  password: 'qwertyyyy',
}
const userData3 = {
  email: 'admin2@mail.com',
  password: 'qwerty',
}

describe('Test Endpoint POST/login success', () => {
  it('Test login success', (done) => {
    request(app)
      .post('/login')
      .send(userData)
      .set('Accept', 'application/json')
      .then(response => {
        const { status, body } = response
        expect(status).toBe(201)
        expect(body).toHaveProperty('message', 'Login Success')
        expect(body).toHaveProperty('access_token', expect.any(String))
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
})

describe('Test Endpoint POST/login failed', () => {
  it('Test login failed', (done) => {
    request(app)
      .post('/login')
      .send(userData2)
      .set('Accept', 'application/json')
      .then(response => {
        const { status, body } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('errors', ['wrong email/password !'])
        done()
      })
  })

  it('Test no email in database', (done) => {
    request(app)
      .post('/login')
      .send(userData3)
      .set('Accept', 'application/json')
      .then((response) => {
        const { status, body } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('errors', ['wrong email/password !'])
        done()
      })
  })

  it('Test email & password empty', (done) => {
    request(app)
      .post('/login')
      .set('Accept', 'application/json')
      .then((response) => {
        const { status, body } = response
        expect(status).toBe(500)
        expect(body).toHaveProperty('errors', [
          'WHERE parameter \'email\' has invalid \'undefined\' value'
        ])
        done()
      })
  })
})
