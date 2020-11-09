const request = require('supertest')
const app = require('../app')

describe('Test Endpoint POST /login', () => {  
  it('test login success', () => {
    request(app)
    .post('/login')
    .send({email: "bimo@mail.com", password: "bimobimo"})
    .set("Accept", "application/json")
    .expect("Content-type", /json/)
    .then(response => {
      let {body, status} = response
      expect(status).toBe(201)
      expect(body).toHaveProperty('email', 'bimo@mail.com')
      expect(body).toHaveProperty('access_token', expect.any(String))
      done()
    })
  })
})

describe('Test Endpoint POST /login', () => {
  it('test failed login password', () => {
    request(app)
    .post('/login')
    .send({email: "sahaieu@mail.com", password: "ngawur"})
    .set("Accept", "application/json")
    .expect("Content-type", /json/)
    .then(response => {
      let {body, status} = response
      expect(status).toBe(400)
      expect(body).toHaveProperty(Object.keys(response.body))
      done()
    })
  })
})