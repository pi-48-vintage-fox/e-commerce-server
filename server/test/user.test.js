const request = require('supertest')
const app = require('../app')

describe('POST /login', () => {
  it('Test login success', (done) => {
    request(app)
      .post('/login')
      .send({
        email: 'brody@mail.id',
        password: 'hohoho'
      })
      .then(res => {
        let { body, status } = res
        expect(status).toBe(200)
        expect(body).toHaveProperty('access_token', expect.any(String))
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })

  it('Test login failed', (done) => {
    request(app)
      .post('/login')
      .send({
        email: 'kokoro@mail.id',
        password: '123456'
      })
      .then(res => {
        let { body, status } = res
        expect(status).toBe(401)
        expect(body).toHaveProperty('message', 'Email/password is wrong!')
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
})