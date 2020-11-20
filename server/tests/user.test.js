const request = require("supertest")
const app = require("../app")
const {
  User
} = require('../models/')
const {hashPassword} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')

let access_token = ""
let customer_token = ""
let id

beforeAll((done) => {
  let admin = {
    email: "peter@mail.com",
    password: "peter",
    full_name: "Gobreta Peter",
    role: "admin",
  }
  let customer = {
    email: "mike@mail.com",
    password: "mike",
    full_name: "Michael Febrian",
  }
  User.create(admin)
    .then(data => {
     
      access_token = generateToken({
        id: data.id,
        email: data.email
      })
      return User.create(customer)
    })
    .then(data => {
      customer_token = generateToken({
        id: data.id,
        email: data.email
      })
      done()
    })
    .catch(err => {
      done(err)
    })
})

describe(" Testing Login ", () => {

  // in case when login success
  test("Login Success", (done) => {
    request(app)
      .post("/login")
      .send({
        email: "peter@mail.com",
        password: "peter"
      })
      .set("Accept", "application/json")
      .then(res => {
        const {
          status,
          body
        } = res
        console.log(body);
        expect(status).toEqual(200)
        expect(body).toHaveProperty("access_token", expect.any(String))
        expect(body).toHaveProperty("full_name", expect.any(String))
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  //in case when login failed because have wrong email//password
  test("Login Failed, wrong password", (done) => {
    const userData = {
      email: "peter@mail.com",
      password: "teper"
    }

    request(app)
      .post("/login")
      .send(userData)
      .set("Accept", "application/json")
      .then((res) => {
        const {
          status,
          body
        } = res
        expect(status).toBe(401)
        expect(body).toHaveProperty("message", "Wrong Email/ Password")
        done()
      })
      .catch((err) => {
        console.log(err)
        done(err)
      })
  })

  // in case when login failed because data not found
  test("Login Failed, no user data in database", (done) => {
    const userData = {
      email: "yeskahaganteng@mail.com",
      password: "akseyanteng"
    }

    request(app)
      .post("/login")
      .send(userData)
      .set("Accept", "application/json")
      .then((res) => {
        // console.log(res, "<<< ini di ...")
        const {
          status,
          body
        } = res
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", "Invalid account!")
        done()
      })
      .catch((err) => {
        console.log(err)
        done(err)
      })
  })

  // in case when email and password are empty
  test("Login Failed, email and password are empty", (done) => {
    const userData = {
      email: "",
      password: ""
    }

    request(app)
      .post("/login")
      .send(userData)
      .set("Accept", "application/json")
      .then((res) => {
        const {
          status,
          body
        } = res
        expect(status).toBe(401)
        expect(body).toHaveProperty("message", "Please input email and password!")
        done()
      })
      .catch((err) => {
        console.log(err)
        done(err)
      })
  })

  // // <<--- END OF TEST CASE

})