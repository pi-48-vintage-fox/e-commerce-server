const request = require("supertest")
const app = require("../app")

describe('[Fail Case] User login -> POST /login', () => {

  it('[Fail Case] Email ada namun password salah', function (done) {
    request(app)
      .post('/login')
      .send({ email: "test1@email.com", password: "ngawu3487dsakdlcs" })
      .set("Accept", "application/json")
      .expect("Content-type", /json/)
      .then(response => {
        let { body, status } = response
        expect(status).toBe(401)
        expect(body).toHaveProperty("msg", "Wrong Email/Password")
        done()
      })
      .catch(err => {
        done(err)
      })
  }),

  it("[Fail Case] Email tidak ditemukan di database", function (done) {
      request(app)
        .post('/login')
        .send({ email: "test1@email.com", password: "qweqwe" })
        .set("Accept", "application/json")
        .expect("Content-type", /json/)
        .then(response => {
          let { body, status } = response
          expect(status).toBe(401)
          expect(body).toHaveProperty("msg", "Wrong Email/Password")
          done()
        })
        .catch(err => {
          done(err)
        })
  })

  it("[Fail Case] Email / Password Kosong", function (done) {
    request(app)
      .post("/login")
      .send({ email: "", password: "" })
      .set("Accept", "application/json")
      .expect("Content-type", /json/)
      .then(response => {
        let { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty("msg", "Email/Password cannot be empty")
        done()
      })
      .catch(err => {
        done(err)
      })
  })

})

describe('[Fail Case] User Register -> POST /register', () => {

  it('[Fail Case] Email sudah ada dalam database', function (done) {
    request(app)
      .post('/register')
      .send({ email: "test1@email.com", password: "ngawur" })
      .set("Accept", "application/json")
      .then(response => {
        let { body, status } = response
        expect(status).toBe(200)
        expect(body).toHaveProperty("msg", "User Created")
        done()
      })
      .catch(err => {
        done(err)
      })
  }),

    it("[Fail Case] Email / Password Kosong", function (done) {
      request(app)
        .post("/register")
        .send({ email: "", password: "" })
        .set("Accept", "application/json")
        .then(response => {
          let { body, status } = response
          let expectedMessages = ["Email Is required", "Password Is required"]
          expect(status).toBe(400)
          expect(body).toHaveProperty("msg", expect.arrayContaining(expectedMessages))
          done()
        })
        .catch(err => {
          done(err)
        })
    })

})

describe('[Success Case] User Login -> POST /login', () => {
  it("[Success Case] Logged in Successfuly -> POST /login", done => {
    request(app)
      .post('/login')
      .send({ email: "admin@admin.com", password: "qweqwe" })
      .then(response => {
        let { body, status } = response
        expect(status).toBe(200)
        expect(body).toHaveProperty("msg", "Login Success")
        expect(body).toHaveProperty("access_token", expect.any(String))
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})