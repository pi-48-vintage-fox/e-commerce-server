const request = require('supertest')
const app = require('../app')

const { User } = require('../models')
const { signToken } = require('../helpers/auth')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

let access_token

beforeAll((done) => {
  User.findOne({
    where: {
      email: 'admin@mail.com',
    },
  }).then((user) => {
    access_token = signToken({
      id: user.id,
      email: user.email,
    })
    done()
  })
})

afterAll((done) => {
  queryInterface
    .bulkDelete('ProductCategories')
    .then(() => {
      done()
    })
    .catch((err) => {
      console.log(err)
      done()
    })
})

// Custom matcher for matching objects in array

expect.extend({
  toContainObject(received, argument) {
    const pass = this.equals(
      received,
      expect.arrayContaining([expect.objectContaining(argument)])
    )

    if (pass) {
      return {
        message: () =>
          `expected ${this.utils.printReceived(
            received
          )} not to contain object ${this.utils.printExpected(argument)}`,
        pass: true,
      }
    } else {
      return {
        message: () =>
          `expected ${this.utils.printReceived(
            received
          )} to contain object ${this.utils.printExpected(argument)}`,
        pass: false,
      }
    }
  },
})

describe('PRODUCT CATEGORY TESTS', () => {
  describe('POST /categories (creating a product category)', () => {
    it('creates a product category', (done) => {
      request(app)
        .post('/categories')
        .set({ access_token })
        .send({
          name: 'Men',
        })
        .then((response) => {
          const { body, status } = response

          expect(status).toBe(201)
          expect(body).toHaveProperty('id', expect.any(Number))
          expect(body).toHaveProperty('name', 'Men')

          done()
        })
        .catch((err) => {
          console.log(err)
          done()
        })
    })

    // it('fails to create a product category (no access token)', (done) => {
    //   request(app)
    //     .then((response) => {})
    //     .catch((err) => {
    //       console.log(err)
    //       done()
    //     })
    // })

    // it('fails to create a product category (wrong access token)', (done) => {
    //   request(app).catch((err) => {
    //     console.log(err)
    //     done()
    //   })
    // })

    // it('fails to create a product category (required field "name" is empty)', (done) => {
    //   request(app)
    //     .then((response) => {})
    //     .catch((err) => {
    //       console.log(err)
    //       done()
    //     })
    // })

    // it('fails to create a product category (invalid da)', (done) => {
    //   request(app)
    // })

    // it('fails to create a product category (no access token)', (done) => {
    //   request(app)
    //     .then((response) => {})
    //     .catch((err) => {
    //       console.log(err)
    //       done()
    //     })
    // })
  })

  describe.only('GET /categories', () => {
    it('fetches all product categories', (done) => {
      request(app)
        .get('/categories')
        .set({ access_token })
        .then((response) => {
          const { body, status } = response
          console.log(body)

          expect(status).toBe(200)
          let obj = body.filter((el) => el.name === 'Women')
          console.log(obj.length, '<< length')
          expect(obj.length).toBeGreaterThan(0)
          // expect(body).toContainObject({ id: expect.any(Number) })
          // expect(body).toContainObject({ name: 'Women' })
        })
        .then(done)
        .catch((err) => {
          console.log(err)
          done()
        })
    })
  })
})
