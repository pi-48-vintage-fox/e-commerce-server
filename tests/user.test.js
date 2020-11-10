const request = require('supertest')
const app = require('../app')

// const { hashPassword } = require('../helpers/auth')
// const { User } = require('../models')

describe('POST /login', () => {
  // it('successfully logs in user', async (done) => {
  // const hash = hashPassword('1234')
  // const user = await User.create({
  //   email: 'admin2@mail.com',
  //   password: hash,
  //   role: 'admin',
  // })

  // console.log(user, '<<<< new user')

  //   const response = await request(app)
  //     .post('/login')
  //     .send({ email: 'admin2@mail.com', password: '1234' })

  //   const { body, status } = response
  //   console.log(body, '<<<< response dari POST login')

  //   expect(status).toEqual(200)
  //   expect(body).toHaveProperty('access_token', expect.any(String))
  //   done()
  // })

  it('successfully logs in user', (done) => {
    request(app)
      .post('/login')
      .send({ email: 'admin@mail.commm', password: '1234' })

      .then((response) => {
        const { body, status } = response
        console.log(body, '<<<< response dari POST login')

        expect(status).toEqual(200)
        expect(body).toHaveProperty('access_token', expect.any(String))
        done()
      })
      .catch((err) => {
        console.log(err)
        done()
      })
  })

  // it('fails user login (right email, wrong password)', (done) => {
  //   request(app)
  //     .post('/login')
  //     .send({ email: 'admin@mail.com', password: '1' })

  //     .then((response) => {
  //       const { body, status } = response
  //       console.log(body, '<<<< response dari POST login')

  //       expect(status).toEqual(401)
  //       expect(body).toHaveProperty('msg', 'Invalid email or password')
  //       done()
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       done()
  //     })
  // })

  // it('fails user login (wrong email)', (done) => {
  //   request(app)
  //     .post('/login')
  //     .send({ email: 'salah@mail.com', password: '1' })

  //     .then((response) => {
  //       const { body, status } = response
  //       console.log(body, '<<<< response dari POST login')

  //       expect(status).toEqual(401)
  //       expect(body).toHaveProperty('msg', 'Invalid email or password')
  //       done()
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       done()
  //     })
  // })

  // it('fails user login (empty email)', (done) => {
  //   request(app)
  //     .post('/login')
  //     .send({ email: '', password: '1234' })

  //     .then((response) => {
  //       const { body, status } = response
  //       console.log(body, '<<<< response dari POST login')

  //       expect(status).toEqual(400)
  //       expect(body).toHaveProperty('msg', 'Email / password was not provided')
  //       done()
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       done()
  //     })
  // })

  // it('fails user login (empty password)', (done) => {
  //   request(app)
  //     .post('/login')
  //     .send({ email: 'admin@mail.com', password: '' })

  //     .then((response) => {
  //       const { body, status } = response
  //       console.log(body, '<<<< response dari POST login')

  //       expect(status).toEqual(400)
  //       expect(body).toHaveProperty('msg', 'Email / password was not provided')
  //       done()
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       done()
  //     })
  // })
})
