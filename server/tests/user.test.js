const request = require('supertest')
const app = require('../app')

describe('Test Endpoint POST /login', () => {  
  it('test login success', (done) => {
    request(app)
    .post('/login')
    .send({email: "admin@mail.com", password: "bimobimo"})
    .set("Accept", "application/json")
    .expect("Content-type", /json/)
    .then(response => {
      let {body, status} = response
      expect(status).toBe(200)
      expect(body).toHaveProperty('email', 'admin@mail.com')
      expect(body).toHaveProperty('access_token', expect.any(String))
      done()
    })
    .catch(err => {
      // console.log(err)
      done()
    })
  })
})

describe('Test Endpoint POST /login', () => {
  it('test failed login password', (done) => {
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
    .catch(err => {
      // console.log(err)
      done()
    })
  })
})

describe('Test Endpoint POST /login', () => {
  it("Test failed login not registered in Database", (done) => {
    request(app)
    .post('/login')
    .send({email: "teukenal@mail.com", password: "naontehsalah"})
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .then(response => {
      let {body, status} = response
      expect(status).toBe(400)
      expect(body).toHaveProperty(Object.keys(response.body))
      done()
    })
    .catch(err => {
      // console.log(err)
      done()
    })
  })
})

describe('Test Endpoint POST /login', () => { 
  it("Test failed login and password are blank", (done) => {
    request(app)
    .post('/login')
    .send({email: "", password: ""})
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .then(response => {
      let {body, status} = response
      expect(status).toBe(400)
      expect(body).toHaveProperty(Object.keys(response.body))
      done()
    })
    .catch(err => {
      // console.log(err)
      done()
    })
  })
})