const request = require('supertest')
const app = require('../app')
const { hashPass } = require('../helpers/bcrypt')
const { sequelize } = require('../models/index')
const { queryInterface } = sequelize
const { User } = require('../models/index')

beforeAll((done) => {
  let admin = {
    email: "admin@mail.com",
    password: "123456"
  }
  User.create(admin)
  .then(() => {
    done()
  })
  .catch(err => {
    done(err)
  })
})
afterAll((done) => {
      queryInterface.bulkDelete("Users")
      .then(() => {
      done()
      })
      .catch((err) => {
      done(err)
      })
})

describe('Test Endpoint POST /login', () => {  
  it('test login success', (done) => {
    request(app)
    .post('/login')
    .send({email: "admin@mail.com", password: "123456"})
    .set("Accept", "application/json")
    .expect("Content-type", /json/)
    .then(response => {
      let {body, status} = response
      // console.log(response);
      expect(status).toBe(200)
      expect(body).toHaveProperty('access_token', expect.any(String))
      done()
    })
    .catch(err => {
      // console.log(err)
      done(err)
    })
  })
})

describe('Test Endpoint POST /login', () => {
  it('test failed login password', (done) => {
    request(app)
    .post('/login')
    .send({email: "admin@mail.com", password: "macammana"})
    .set("Accept", "application/json")
    .expect("Content-type", /json/)
    .then(response => {
      let {body, status} = response
      expect(status).toBe(401)
      expect(body).toHaveProperty("msg", "Wrong email or password")
      done()
    })
    .catch(err => {
      // console.log(err)
      done(err)
    })
  })
})

describe('Test Endpoint POST /login', () => {
  it("Test failed account is not registered in database", (done) => {
    request(app)
    .post('/login')
    .send({email: "wedew@mail.com", password: "kokbisa"})
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .then(response => {
      let {body, status} = response
      expect(status).toBe(401)
      expect(body).toHaveProperty("msg", "Wrong email or password")
      done()
    })
    .catch(err => {
      // console.log(err)
      done(err)
    })
  })
})

describe('Test Endpoint POST /login', () => { 
  it("Test failed empty login and password", (done) => {
    request(app)
    .post('/login')
    .send({email: "", password: ""})
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .then(response => {
      let {body, status} = response
      console.log(body);
      expect(status).toBe(400)
      expect(body).toHaveProperty("msg", "Please input your email")
      done()
    })
    .catch(err => {
      console.log(err)
      done(err)
    })
  })
})