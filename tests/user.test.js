const request = require('supertest');
const app = require('../app.js');
const { sequelize } = require('../models/index');
const { queryInterface } = sequelize;

afterAll(done => {
  queryInterface.bulkDelete("Users")
    .then(() => {
      done();
    })
    .catch(err => {
      done();
    })
})

describe('Test Endpoint POST /adminRegister', () => {
  // Success Register
  it('Test register success', done => {
    request(app)
      .post('/adminRegister')
      .send({
        first_name: 'Musa',
        last_name: 'Bagja',
        gender: 'male',
        email: 'musabagja@gmail.com',
        password: 'password',
      })
      .then(response => {
        const { body, status } = response;

        expect(status).toEqual(201);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("first_name", "Musa");
        expect(body).toHaveProperty("last_name", "Bagja");
        expect(body).toHaveProperty("gender", "male");
        expect(body).toHaveProperty("email", "musabagja@gmail.com");
        expect(body).toHaveProperty("role", "admin");
        done();
      })
      .catch(err => {
        console.log(err);
      })
  })

  // Invalid Register

  // Cannot register with any registered email
  it('Test register registered email', done => {
    request(app)
      .post('/adminRegister')
      .send({
        first_name: 'Musa',
        last_name: 'Bagja',
        gender: 'male',
        email: 'musabagja@gmail.com',
        password: 'password',
      })
      .then(response => {
        const { body, status } = response;

        expect(status).toEqual(400);
        expect(body).toHaveProperty("message", "Email has already registered");
        done();
      })
      .catch(err => {
        console.log(err);
      })
  })

  // Cannot register email with a non-email format
  it('Test register cannot register a non-email format in email input', done => {
    request(app)
    .post('/adminRegister')
    .send({
      first_name: 'Musa',
      last_name: 'Bagja',
      gender: 'male',
      email: 'musabagja@gmail',
      password: 'password',
    })
    .then(response => {
      const { body, status } = response;

        expect(status).toEqual(400);
        expect(body).toHaveProperty("message", "Email must be using email format");
        done();
    })
    .catch(err => {
      console.log(err)
    })
  })

  // Each key must not be empty
  it('Test register each key must not be empty register', done => {
    request(app)
      .post('/adminRegister')
      .send({
        first_name: '',
        last_name: '',
        gender: 'male',
        email: 'musabagja@gmail.com',
        password: 'password',
      })
      .then(response => {
        const { body, status } = response;

        expect(status).toEqual(400);
        expect(body).toHaveProperty("message", "First name required, Last name required");
        done();
        // The message would dynamicly changeable according to what you've emptied
      })
      .catch(err => {
        console.log(err)
      })
  })
})

describe('Test Endpoint POST /adminLogin', () => {
  // Success Login
  it('Test login success', done => {
    request(app)
      .post('/adminLogin')
      .send({ email: 'musabagja@gmail.com', password: 'password' })
      .then(response => {
        let { body, status } = response;

        expect(status).toEqual(200);
        expect(body).toHaveProperty("token", expect.anything());
        done();
      })
      .catch(err => {
        console.log(err);
      })
  })

  // Invalid Login
  it('Test login invalid', done => {
    request(app)
      .post('/adminLogin')
      .send({ email: '', password: '' })
      .then(response => {
        let { body, status } = response;

        expect(status).toEqual(401);
        expect(body).toHaveProperty("message", "Email/password incorrect");
        done();
      })
      .catch(err => {
        console.log(err);
      })
  })
})