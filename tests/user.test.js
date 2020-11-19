const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models/index");
const { queryInterface } = sequelize;


afterAll(() => {
  queryInterface
    .bulkDelete("Users", null)
    .then((res) => {
      // console.log(res);
    })
    .catch((err) => {
      // console.log(err);
    });
});

let dataUser = {
  name: "admin",
  email: "admin@mail.com",
  password: "1234",
  image:
    "https://www.freepik.com/free-photo/young-attractive-handsome-guy-feels-delighted-gladden-amazed_10518607.htm",
  role: "admin",
}

describe("Testing register user end point /register", () => {
  it("POST register user success", (done) => {
    request(app)
      .post("/register")
      .send(dataUser)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(201);
        expect(body).toHaveProperty('id', expect.any(Number));
        expect(body).toHaveProperty("name", "admin");
        expect(body).toHaveProperty("email", "admin@mail.com");
        expect(body).toHaveProperty(
          "image",
          "https://www.freepik.com/free-photo/young-attractive-handsome-guy-feels-delighted-gladden-amazed_10518607.htm"
        );
        done();
      })
      .catch((err) => {
        // console.log(err);
        done(err);
      });
  });

  it("register user failed - email must be unique", (done) => {
    request(app)
    .post("/register")
    .send(dataUser)
    .then((response) => {
      const { body, status } = response;
      expect(status).toBe(400); // harusnya 400
      expect(body).toHaveProperty("errorMsg", "email must be unique");
      done();
    })
    .catch((err) => {
      // console.log(err);
      done(err);
    });
  })

  it("register user failed - format must be an email", (done) => {
    const user = { ...dataUser, email: "testinggmail.com"}
    request(app)
    .post("/register")
    .send(user)
    .then(response => {
      const {body, status} = response
      expect(status).toBe(400)
      expect(body).toHaveProperty("errorMsg", "Format must be an email")
      done()
    })
    .catch(err => {
      // console.log(err)
      done(err)
    })
  })

  it("register user failed - Email is required", (done) => {
    let user = { ...dataUser, email: "" }
    // console.log(user, "ni user <<<<<<<")
    request(app)
    .post("/register")
    .send(user)
    .then(response => {
      const {body, status} = response
      expect(status).toBe(400)
      expect(body).toHaveProperty("errorMsg", "Email is required")
      done()
    })
    .catch(err => {
      // console.log(err)
      done(err)
    })
  })
});

describe("Testing login admin end point /login", () => {
  it("login admin success", (done) => {
    request(app)
    .post("/login")
    .send({email: "admin@mail.com", password: "1234"})
    .then(response => {
      const {body, status} = response
      expect(status).toBe(200)
      expect(body).toHaveProperty("access_token", expect.any(String))
      expect(body).toHaveProperty("name", "admin")
      done()
    })
    .catch(err => {
      // console.log(err)
      done(err)
    })
  })
  
  it("login admin failed", (done) => {
    request(app)
    .post("/login")
    .send({email: "admin@mail.com", password: "34"})
    .then(response => {
      // console.log(response)
      const {body, status} = response
      expect(status).toBe(401)
      expect(body).toHaveProperty("errorMsg", "Email or Password wrong")
      done()
    })
    .catch(err => {
      // console.log(err)
      done(err)
    })
  })

})