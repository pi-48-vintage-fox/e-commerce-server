const request = require("supertest")
const app = require("../app")

describe(" Testing Login ", () => {

  // in case when login success
  test("Login Success", (done) => {

    const userData = {
      email: "yeska@mail.com",
      password: "yeska"
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
        expect(status).toBe(200) 
        expect(body).toHaveProperty("access_token", expect.any(String)) 
        expect(body).toHaveProperty("full_name", expect.any(String)) 
        done()
      })
      .catch((err) => {
        console.log(err)
        done(err)
      })
  })

  //in case when login failed because have wrong email//password
  test("Login Failed, wrong password", (done) => {
    const userData = {
      email: "yeska@mail.com",
      password: "aksey"
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

  // // in case when email and password are empty
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
        const{
          status,
          body
        } = res
        expect(status).toBe(400)
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