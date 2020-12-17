const request = require('supertest')
const app = require('../app')

const { User, ProductCategory } = require('../models')
const { signToken } = require('../helpers/auth')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

let access_token, id

beforeAll((done) => {
  User.findOne({
    where: {
      email: 'admin@mail.com',
    },
  })
    .then((user) => {
      access_token = signToken({
        id: user.id,
        email: user.email,
      })
      console.log({ access_token })
      done()
    })
    .catch((err) => done(err))
})

afterAll((done) => {
  queryInterface
    .bulkDelete('ProductCategories')
    .then(() => {
      done()
    })
    .catch((err) => done(err))
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
    it('successfully creates a product category', (done) => {
      request(app)
        .post('/categories')
        // .set('access_token', access_token)
        .set({ access_token })
        .send({
          name: 'Men',
        })
        .then((response) => {
          const { body, status } = response
          id = body.id
          expect(status).toBe(201)
          expect(body).toHaveProperty('id', expect.any(Number))
          expect(body).toHaveProperty('name', 'Men')

          done()
        })
        .catch((err) => done(err))
    })
  })

  it('fails to create a product category (no access token)', (done) => {
    request(app)
      .post('/categories')
      .send({
        name: 'Men',
      })
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(401)
        expect(body).toHaveProperty('msg', 'Not authenticated')
        done()
      })
      .catch((err) => done(err))
  })

  it('fails to create a product category (wrong access token)', (done) => {
    request(app)
      .post('/categories')
      .set('access_token', 'ngarang')
      .send({
        name: 'Men',
      })
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(401)
        expect(body).toHaveProperty('msg', 'Access token is invalid / expired')
        done()
      })
      .catch((err) => done(err))
  })

  it('fails to create a product category (required field "name" is empty)', (done) => {
    request(app)
      .post('/categories')
      .set({ access_token })
      .send({
        name: '',
      })
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(body.msg).toContain('Product category name cannot be empty')
        done()
      })
      .catch((err) => done(err))
  })

  it('fails to create a product category (invalid parent ID)', (done) => {
    request(app)
      .post('/categories')
      .set({ access_token })
      .send({
        name: 'Men',
        parentId: 10,
      })
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(404)
        expect(body).toHaveProperty('msg', 'Product category not found')
        done()
      })
      .catch((err) => done(err))
  })

  describe('GET /categories', () => {
    it('successfully fetches all product categories', (done) => {
      request(app)
        .get('/categories')
        .set({ access_token })
        .then((response) => {
          const { body, status } = response
          console.log(body)

          expect(status).toBe(200)
          let obj = body.filter((el) => el.name === 'Men')
          console.log(obj.length, '<< length')
          expect(obj.length).toBeGreaterThan(0)
          // expect(body).toContainObject({ id: expect.any(Number) })
          // expect(body).toContainObject({ name: 'Men' })
          done()
        })
        .catch((err) => done(err))
    })
  })

  describe('DELETE /categories', () => {
    it('sucessfully delete a product category', (done) => {
      request(app)
        .delete('/categories/' + id)
        .set({ access_token })
        .then((response) => {
          const { body, status } = response
          console.log(body)
          expect(status).toBe(200)
          expect(body).toHaveProperty(
            'msg',
            'Category was deleted successfully'
          )
          done()
        })
        .catch((err) => done(err))
    })
  })
})
