const request = require('supertest')
const app = require('../app')

const { User, Product } = require('../models')
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
    .bulkDelete('Products')
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

describe('PRODUCT TESTS', () => {
  describe('POST /products (creating a product)', () => {
    it('successfully creates a product', (done) => {
      request(app)
        .post('/products')
        // .set('access_token', access_token)
        .set({ access_token })
        .send({
          name: 'Product 1',
          price: 50000,
          stock: 100,
          ProductCategoryId: 1,
          description: 'Description of Product 1',
          imageUrl: 'https://example.com/shoes/shoe1.jpg',
          imageId: 'shoes/shoe1',
        })
        .then((response) => {
          const { body, status } = response
          id = body.id

          expect(status).toBe(201)
          expect(body).toHaveProperty('id', expect.any(Number))
          expect(body).toHaveProperty('name', 'Product 1')
          expect(body).toHaveProperty('price', 50000)
          expect(body).toHaveProperty('stock', 100)
          expect(body).toHaveProperty('ProductCategoryId', 1)
          expect(body).toHaveProperty('description', 'Description of Product 1')
          expect(body).toHaveProperty(
            'imageUrl',
            'https://example.com/shoes/shoe1.jpg'
          )
          expect(body).toHaveProperty('imageId', 'shoes/shoe1')

          done()
        })
        .catch((err) => done(err))
    })
  })

  it('fails to create a product (no access token)', (done) => {
    request(app)
      .post('/products')
      .send({
        name: 'Product 1',
        price: 50000,
        stock: 100,
        ProductCategoryId: 1,
        description: 'Description of Product 1',
        imageUrl: 'https://example.com/shoes/shoe1.jpg',
        imageId: 'shoes/shoe1',
      })
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(401)
        expect(body).toHaveProperty('msg', 'Not authenticated')
        done()
      })
      .catch((err) => done(err))
  })

  it('fails to create a product (wrong access token)', (done) => {
    request(app)
      .post('/products')
      .set('access_token', 'ngarang')
      .send({
        name: 'Product 1',
        price: 50000,
        stock: 100,
        ProductCategoryId: 1,
        description: 'Description of Product 1',
        imageUrl: 'https://example.com/shoes/shoe1.jpg',
        imageId: 'shoes/shoe1',
      })
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(401)
        expect(body).toHaveProperty('msg', 'Access token is invalid / expired')
        done()
      })
      .catch((err) => done(err))
  })

  it('fails to create a product (required field "name" is empty)', (done) => {
    request(app)
      .post('/products')
      .set({ access_token })
      .send({
        name: '',
        price: 50000,
        stock: 100,
        ProductCategoryId: 1,
        description: 'Description of Product 1',
        imageUrl: 'https://example.com/shoes/shoe1.jpg',
        imageId: 'shoes/shoe1',
      })
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(body.msg).toContain('Product name cannot be empty')
        done()
      })
      .catch((err) => done(err))
  })

  it('fails to create a product (required field "price" is empty)', (done) => {
    request(app)
      .post('/products')
      .set({ access_token })
      .send({
        name: 'Product 1',
        price: '',
        stock: 100,
        ProductCategoryId: 1,
        description: 'Description of Product 1',
        imageUrl: 'https://example.com/shoes/shoe1.jpg',
        imageId: 'shoes/shoe1',
      })
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(body.msg).toContain('Product price cannot be empty')
        done()
      })
      .catch((err) => done(err))
  })

  it('fails to create a product (required field "price" is null)', (done) => {
    request(app)
      .post('/products')
      .set({ access_token })
      .send({
        name: 'Product 1',
        price: undefined,
        stock: 100,
        ProductCategoryId: 1,
        description: 'Description of Product 1',
        imageUrl: 'https://example.com/shoes/shoe1.jpg',
        imageId: 'shoes/shoe1',
      })
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(body.msg).toContain('Product price cannot be empty')
        done()
      })
      .catch((err) => done(err))
  })

  it('fails to create a product (price is negative)', (done) => {
    request(app)
      .post('/products')
      .set({ access_token })
      .send({
        name: 'Product 1',
        price: -10,
        stock: 50,
        ProductCategoryId: 1,
        description: 'Description of Product 1',
        imageUrl: 'https://example.com/shoes/shoe1.jpg',
        imageId: 'shoes/shoe1',
      })
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(400)
        let errors = body.msg
        expect(errors).toContain('Price cannot be less than 0')
        done()
      })
      .catch((err) => done(err))
  })

  it('fails to create a product (price is not of a numeric type)', (done) => {
    request(app)
      .post('/products')
      .set({ access_token })
      .send({
        name: 'Product 1',
        price: 'sejuta',
        stock: 50,
        ProductCategoryId: 1,
        description: 'Description of Product 1',
        imageUrl: 'https://example.com/shoes/shoe1.jpg',
        imageId: 'shoes/shoe1',
      })
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(body.msg).toContain('Price must be of numeric type')
        done()
      })
      .catch((err) => done(err))
  })

  it('fails to create a product (required field "stock" is null)', (done) => {
    request(app)
      .post('/products')
      .set({ access_token })
      .send({
        name: 'Product 1',
        price: 50000,
        stock: null,
        ProductCategoryId: 1,
        description: 'Description of Product 1',
        imageUrl: 'https://example.com/shoes/shoe1.jpg',
        imageId: 'shoes/shoe1',
      })
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(body.msg).toContain('Product stock cannot be empty')
        done()
      })
      .catch((err) => done(err))
  })

  it('fails to create a product (required field "stock" is empty)', (done) => {
    request(app)
      .post('/products')
      .set({ access_token })
      .send({
        name: 'Product 1',
        price: 100000,
        stock: '',
        ProductCategoryId: 1,
        description: 'Description of Product 1',
        imageUrl: 'https://example.com/shoes/shoe1.jpg',
        imageId: 'shoes/shoe1',
      })
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(400)
        let errors = body.msg
        expect(errors).toContain('Product stock cannot be empty')
        done()
      })
      .catch((err) => done(err))
  })

  it('fails to create a product (stock is negative)', (done) => {
    request(app)
      .post('/products')
      .set({ access_token })
      .send({
        name: 'Product 1',
        price: 100000,
        stock: -50,
        ProductCategoryId: 1,
        description: 'Description of Product 1',
        imageUrl: 'https://example.com/shoes/shoe1.jpg',
        imageId: 'shoes/shoe1',
      })
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(400)
        let errors = body.msg
        expect(errors).toContain('Product stock cannot be less than 0')
        done()
      })
      .catch((err) => done(err))
  })

  it('fails to create a product (stock is not of a numeric type)', (done) => {
    request(app)
      .post('/products')
      .set({ access_token })
      .send({
        name: 'Product 1',
        price: 100000,
        stock: 'seratus',
        ProductCategoryId: 1,
        description: 'Description of Product 1',
        imageUrl: 'https://example.com/shoes/shoe1.jpg',
        imageId: 'shoes/shoe1',
      })
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(body.msg).toContain('Product stock must be of numeric type')
        done()
      })
      .catch((err) => done(err))
  })

  describe('GET /products', () => {
    it('successfully fetches all product products', (done) => {
      request(app)
        .get('/products')
        .set({ access_token })
        .then((response) => {
          const { body, status } = response
          console.log(body)

          expect(status).toBe(200)
          let obj = body.filter((el) => el.name === 'Product 1')
          console.log(obj.length, '<< length')
          expect(obj.length).toBeGreaterThan(0)
          expect(body).toContainObject({ id: expect.any(Number) })
          expect(body).toContainObject({ name: 'Product 1' })
          done()
        })
        .catch((err) => done(err))
    })

    it('fails to fetch products data (no access token)', (done) => {
      request(app)
        .get('/products')
        .then((response) => {
          const { body, status } = response

          expect(status).toBe(401)
          expect(body).toHaveProperty('msg', 'Not authenticated')
          done()
        })
        .catch((err) => done(err))
    })

    it('fails to fetch products data (invalid access token)', (done) => {
      request(app)
        .get('/products')
        .set({ access_token: 'ngarang' })
        .then((response) => {
          const { body, status } = response

          expect(status).toBe(401)
          expect(body).toHaveProperty(
            'msg',
            'Access token is invalid / expired'
          )
          done()
        })
        .catch((err) => done(err))
    })
  })

  describe('DELETE /products', () => {
    it('sucessfully delete a product', (done) => {
      request(app)
        .delete('/products/' + id)
        .set({ access_token })
        .then((response) => {
          const { body, status } = response
          console.log(body)
          expect(status).toBe(200)
          expect(body).toHaveProperty('msg', 'Product was deleted successfully')
          done()
        })
        .catch((err) => done(err))
    })
  })

  describe('PUT /products', () => {
    it('sucessfully modifies a product', (done) => {
      request(app)
        .put('/products/' + id)
        .set({ access_token })
        .send({
          name: 'Modified Product 1',
          price: 150000,
          stock: 1000,
          ProductCategoryId: 1,
          description: 'Modified description of Product 1',
          imageUrl: 'https://example.com/shoes/shoe1-modified.jpg',
          imageId: 'shoes/shoe1-modified',
        })
        .then((response) => {
          const { body, status } = response
          console.log(body)
          expect(status).toBe(200)
          expect(body).toHaveProperty(
            'msg',
            'Product was modified successfully'
          )
          done()
        })
        .catch((err) => done(err))
    })
    it('fails to modify a product (no access token)', (done) => {
      request(app)
        .put('/products/' + id)
        .send({
          name: 'Product 1',
          price: 50000,
          stock: 100,
          ProductCategoryId: 1,
          description: 'Description of Product 1',
          imageUrl: 'https://example.com/shoes/shoe1.jpg',
          imageId: 'shoes/shoe1',
        })
        .then((response) => {
          const { body, status } = response
          expect(status).toBe(401)
          expect(body).toHaveProperty('msg', 'Not authenticated')
          done()
        })
        .catch((err) => done(err))
    })
    it('fails to modify a product (wrong access token)', (done) => {
      request(app)
        .put('/products/' + id)
        .set('access_token', 'ngarang')
        .send({
          name: 'Product 1',
          price: 50000,
          stock: 100,
          ProductCategoryId: 1,
          description: 'Description of Product 1',
          imageUrl: 'https://example.com/shoes/shoe1.jpg',
          imageId: 'shoes/shoe1',
        })
        .then((response) => {
          const { body, status } = response
          expect(status).toBe(401)
          expect(body).toHaveProperty(
            'msg',
            'Access token is invalid / expired'
          )
          done()
        })
        .catch((err) => done(err))
    })
    // it('fails to modify a product (required field "name" is empty)', (done) => {
    //   request(app)
    //     .put('/products/' + id)
    //     .set({ access_token })
    //     .send({
    //       name: '',
    //       price: 50000,
    //       stock: 100,
    //       ProductCategoryId: 1,
    //       description: 'Description of Product 1',
    //       imageUrl: 'https://example.com/shoes/shoe1.jpg',
    //       imageId: 'shoes/shoe1',
    //     })
    //     .then((response) => {
    //       const { body, status } = response
    //       expect(status).toBe(400)
    //       expect(body).toHaveProperty('msg', 'Product name cannot be empty')
    //       done()
    //     })
    //     .catch((err) => done(err))
    // })
    // it('fails to modify a product (required field "price" is empty)', (done) => {
    //   request(app)
    //     .put('/products/' + id)
    //     .set({ access_token })
    //     .send({
    //       name: 'Product 1',
    //       price: '',
    //       stock: 100,
    //       ProductCategoryId: 1,
    //       description: 'Description of Product 1',
    //       imageUrl: 'https://example.com/shoes/shoe1.jpg',
    //       imageId: 'shoes/shoe1',
    //     })
    //     .then((response) => {
    //       const { body, status } = response
    //       expect(status).toBe(400)
    //       // expect(body).toHaveProperty('msg', 'Product price cannot be empty')
    //       expect(body.msg).toContain('Product price cannot be empty')
    //       done()
    //     })
    //     .catch((err) => done(err))
    // })
    // it('fails to modify a product (required field "price" is null)', (done) => {
    //   request(app)
    //     .put('/products/' + id)
    //     .set({ access_token })
    //     .send({
    //       name: 'Product 1',
    //       price: undefined,
    //       stock: 100,
    //       ProductCategoryId: 1,
    //       description: 'Description of Product 1',
    //       imageUrl: 'https://example.com/shoes/shoe1.jpg',
    //       imageId: 'shoes/shoe1',
    //     })
    //     .then((response) => {
    //       const { body, status } = response
    //       expect(status).toBe(400)
    //       expect(body).toHaveProperty('msg', 'Product price cannot be empty')
    //       done()
    //     })
    //     .catch((err) => done(err))
    // })
    it('fails to modify a product (price is negative)', (done) => {
      request(app)
        .put('/products/' + id)
        .set({ access_token })
        .send({
          name: 'Product 1',
          price: -10,
          stock: 50,
          ProductCategoryId: 1,
          description: 'Description of Product 1',
          imageUrl: 'https://example.com/shoes/shoe1.jpg',
          imageId: 'shoes/shoe1',
        })
        .then((response) => {
          const { body, status } = response
          expect(status).toBe(400)
          let errors = body.msg
          expect(errors).toContain('Price cannot be less than 0')
          done()
        })
        .catch((err) => done(err))
    })
    it('fails to modify a product (price is not of a numeric type)', (done) => {
      request(app)
        .put('/products/' + id)
        .set({ access_token })
        .send({
          name: 'Product 1',
          price: 'sejuta',
          stock: 50,
          ProductCategoryId: 1,
          description: 'Description of Product 1',
          imageUrl: 'https://example.com/shoes/shoe1.jpg',
          imageId: 'shoes/shoe1',
        })
        .then((response) => {
          const { body, status } = response
          expect(status).toBe(400)
          expect(body.msg).toContain('Price must be of numeric type')
          done()
        })
        .catch((err) => done(err))
    })
    it('fails to modify a product (required field "stock" is null)', (done) => {
      request(app)
        .put('/products/' + id)
        .set({ access_token })
        .send({
          name: 'Product 1',
          price: 50000,
          stock: null,
          ProductCategoryId: 1,
          description: 'Description of Product 1',
          imageUrl: 'https://example.com/shoes/shoe1.jpg',
          imageId: 'shoes/shoe1',
        })
        .then((response) => {
          const { body, status } = response
          expect(status).toBe(400)
          expect(body.msg).toContain('Product stock cannot be empty')
          done()
        })
        .catch((err) => done(err))
    })
    it('fails to modify a product (required field "stock" is empty)', (done) => {
      request(app)
        .put('/products/' + id)
        .set({ access_token })
        .send({
          name: 'Product 1',
          price: 100000,
          stock: '',
          ProductCategoryId: 1,
          description: 'Description of Product 1',
          imageUrl: 'https://example.com/shoes/shoe1.jpg',
          imageId: 'shoes/shoe1',
        })
        .then((response) => {
          const { body, status } = response
          expect(status).toBe(400)
          let errors = body.msg
          expect(errors).toContain('Product stock cannot be empty')
          done()
        })
        .catch((err) => done(err))
    })
    it('fails to modify a product (stock is negative)', (done) => {
      request(app)
        .put('/products/' + id)
        .set({ access_token })
        .send({
          name: 'Product 1',
          price: 100000,
          stock: -50,
          ProductCategoryId: 1,
          description: 'Description of Product 1',
          imageUrl: 'https://example.com/shoes/shoe1.jpg',
          imageId: 'shoes/shoe1',
        })
        .then((response) => {
          const { body, status } = response
          expect(status).toBe(400)
          let errors = body.msg
          expect(errors).toContain('Product stock cannot be less than 0')
          done()
        })
        .catch((err) => done(err))
    })
    it('fails to modify a product (stock is not of a numeric type)', (done) => {
      request(app)
        .put('/products/' + id)
        .set({ access_token })
        .send({
          name: 'Product 1',
          price: 100000,
          stock: 'seratus',
          ProductCategoryId: 1,
          description: 'Description of Product 1',
          imageUrl: 'https://example.com/shoes/shoe1.jpg',
          imageId: 'shoes/shoe1',
        })
        .then((response) => {
          const { body, status } = response
          expect(status).toBe(400)
          expect(body.msg).toContain('Product stock must be of numeric type')
          done()
        })
        .catch((err) => done(err))
    })
  })
})
