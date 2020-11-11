const request = require('supertest')
const app = require('../app')
const { signToken } = require('../helpers/jwt')
const { User } = require('../models')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
let access_token = ''
let productId = ''
let nonAdminToken = ''

beforeAll((done) => {
  User.findOne({
    where: {
      email: 'riz@mail.id'
    }
  })
    .then(user => {
      access_token = signToken({
        id: user.id,
        email: user.email
      })
      done()
    })
    .catch(err => {
      console.log(err);
      done()
    })

  User.findOne({
    where: {
      email: 'brody@mail.id'
    }
  })
    .then(user => {
      nonAdminToken = signToken({
        id: user.id,
        email: user.email
      })
      done()
    })
    .catch(err => {
      console.log(err);
      done()
    })
})

afterAll((done) => {
  queryInterface.bulkDelete('Products')
    .then(() => {
      done()
    })
    .catch(err => {
      console.log(err);
      done()
    })
})

describe('POST /products', () => {
  it('Test add data success', (done) => {
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send({
        name: 'Naikin Shoes',
        image_url: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/i1-728eb69b-04be-4f07-8483-15f4829d4cb5/air-max-2090-mens-shoe-3pVM46.jpg',
        price: 1299000,
        stock: 50
      })
      .then(res => {
        const { body, status } = res
        productId = body.id
        expect(status).toBe(201)
        expect(body).toHaveProperty('name', 'Naikin Shoes')
        expect(body).toHaveProperty('image_url', 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/i1-728eb69b-04be-4f07-8483-15f4829d4cb5/air-max-2090-mens-shoe-3pVM46.jpg')
        expect(body).toHaveProperty('price', 1299000)
        expect(body).toHaveProperty('stock', 50)
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })

  it('Test add product failed authentication', (done) => {
    request(app)
      .post('/products')
      .send({
        name: 'Naikin Shoes',
        image_url: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/i1-728eb69b-04be-4f07-8483-15f4829d4cb5/air-max-2090-mens-shoe-3pVM46.jpg',
        price: 1299000,
        stock: 50
      })
      .then(res => {
        const { body, status } = res
        expect(status).toBe(401)
        expect(body).toHaveProperty('msg', 'Authentication failed! You have to login first')
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })

  it('Test add product failed authorization', (done) => {
    request(app)
      .post('/products')
      .set('access_token', nonAdminToken)
      .send({
        name: 'Naikin Shoes',
        image_url: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/i1-728eb69b-04be-4f07-8483-15f4829d4cb5/air-max-2090-mens-shoe-3pVM46.jpg',
        price: 1299000,
        stock: 50
      })
      .then(res => {
        const { body, status } = res
        expect(status).toBe(401)
        expect(body).toHaveProperty('msg', 'Authorization failed! You cannot access this data')
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })

  it('Test field "name" empty', (done) => {
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send({
        name: '',
        image_url: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/i1-728eb69b-04be-4f07-8483-15f4829d4cb5/air-max-2090-mens-shoe-3pVM46.jpg',
        price: 1299000,
        stock: 50
      })
      .then(res => {
        const { body, status } = res
        expect(status).toBe(400)
        expect(body).toHaveProperty('msg', 'Name cannot be empty!')
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })

  it('Test field "image_url" empty', (done) => {
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send({
        name: 'Naikin Shoes',
        image_url: '',
        price: 1299000,
        stock: 50
      })
      .then(res => {
        const { body, status } = res
        expect(status).toBe(400)
        expect(body).toHaveProperty('msg', 'Image URL cannot be empty!')
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })

  it('Test field "price" empty', (done) => {
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send({
        name: 'Naikin Shoes',
        image_url: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/i1-728eb69b-04be-4f07-8483-15f4829d4cb5/air-max-2090-mens-shoe-3pVM46.jpg',
        price: '',
        stock: 50
      })
      .then(res => {
        const { body, status } = res
        expect(status).toBe(400)
        expect(body).toHaveProperty('msg', 'Price cannot be empty!')
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })

  it('Test field "stock" empty', (done) => {
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send({
        name: 'Naikin Shoes',
        image_url: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/i1-728eb69b-04be-4f07-8483-15f4829d4cb5/air-max-2090-mens-shoe-3pVM46.jpg',
        price: 1299000,
        stock: ''
      })
      .then(res => {
        const { body, status } = res
        expect(status).toBe(400)
        expect(body).toHaveProperty('msg', 'Stock cannot be empty!')
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })

  it('Test field "price" negative value', (done) => {
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send({
        name: 'Naikin Shoes',
        image_url: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/i1-728eb69b-04be-4f07-8483-15f4829d4cb5/air-max-2090-mens-shoe-3pVM46.jpg',
        price: -2499000,
        stock: 50
      })
      .then(res => {
        const { body, status } = res
        expect(status).toBe(400)
        expect(body).toHaveProperty('msg', 'Price cannot be a negative value!')
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })

  it('Test field "stock" negative value', (done) => {
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send({
        name: 'Naikin Shoes',
        image_url: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/i1-728eb69b-04be-4f07-8483-15f4829d4cb5/air-max-2090-mens-shoe-3pVM46.jpg',
        price: 2499000,
        stock: -50
      })
      .then(res => {
        const { body, status } = res
        expect(status).toBe(400)
        expect(body).toHaveProperty('msg', 'Stock cannot be a negative value!')
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
})

describe('GET /products', () => {
  it('Test fetching data success', (done) => {
    request(app)
      .get('/products')
      .set('access_token', access_token)
      .then(res => {
        const { body, status } = res

        expect(status).toBe(200)
        body.data.forEach(product => {
          expect(product).toHaveProperty('name', 'Naikin Shoes')
          expect(product).toHaveProperty('image_url', 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/i1-728eb69b-04be-4f07-8483-15f4829d4cb5/air-max-2090-mens-shoe-3pVM46.jpg')
          expect(product).toHaveProperty('price', 1299000)
          expect(product).toHaveProperty('stock', 50)
        })
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })

  it('Test fetching product failed authentication', (done) => {
    request(app)
      .get('/products')
      .then(res => {
        const { body, status } = res
        expect(status).toBe(401)
        expect(body).toHaveProperty('msg', 'Authentication failed! You have to login first')
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })

  it('Test fetching product failed authorization', (done) => {
    request(app)
      .get('/products')
      .set('access_token', nonAdminToken)
      .then(res => {
        const { body, status } = res
        expect(status).toBe(401)
        expect(body).toHaveProperty('msg', 'Authorization failed! You cannot access this data')
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
})

describe('PUT /products/:id', () => {
  it('Test edit data success', (done) => {
    request(app)
      .put(`/products/${productId}`)
      .set('access_token', access_token)
      .send({
        name: 'Naikin Zoo Shoes',
        image_url: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/i1-728eb69b-04be-4f07-8483-15f4829d4cb5/air-max-2090-mens-shoe-3pVM46.jpg',
        price: 1599000,
        stock: 50
      })
      .then(res => {
        const { body, status } = res
        expect(status).toBe(200)
        expect(body).toHaveProperty('msg', 'Successfully edited data with id: ' + productId)
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })

  it('Test edit authentication failed', (done) => {
    request(app)
      .put(`/products/${productId}`)
      .send({
        name: 'Naikin Zoo Shoes',
        image_url: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/i1-728eb69b-04be-4f07-8483-15f4829d4cb5/air-max-2090-mens-shoe-3pVM46.jpg',
        price: 1599000,
        stock: 50
      })
      .then(res => {
        const { body, status } = res
        expect(status).toBe(401)
        expect(body).toHaveProperty('msg', 'Authentication failed! You have to login first')
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })

  it('Test edit authorization failed', (done) => {
    request(app)
      .put(`/products/${productId}`)
      .set('access_token', nonAdminToken)
      .send({
        name: 'Naikin Zoo Shoes',
        image_url: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/i1-728eb69b-04be-4f07-8483-15f4829d4cb5/air-max-2090-mens-shoe-3pVM46.jpg',
        price: 1599000,
        stock: 50
      })
      .then(res => {
        const { body, status } = res
        expect(status).toBe(401)
        expect(body).toHaveProperty('msg', 'Authorization failed! You cannot access this data')
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })

  it('Test edit name empty', (done) => {
    request(app)
      .put(`/products/${productId}`)
      .set('access_token', access_token)
      .send({
        name: '',
        image_url: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/i1-728eb69b-04be-4f07-8483-15f4829d4cb5/air-max-2090-mens-shoe-3pVM46.jpg',
        price: 1599000,
        stock: 50
      })
      .then(res => {
        const { body, status } = res
        expect(status).toBe(400)
        expect(body).toHaveProperty('msg', 'Name cannot be empty!')
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })

  it('Test edit url empty', (done) => {
    request(app)
      .put(`/products/${productId}`)
      .set('access_token', access_token)
      .send({
        name: 'Naiki Zoo Shoes',
        image_url: '',
        price: 1599000,
        stock: 50
      })
      .then(res => {
        const { body, status } = res
        expect(status).toBe(400)
        expect(body).toHaveProperty('msg', 'Image URL cannot be empty!')
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })

  it('Test edit name empty', (done) => {
    request(app)
      .put(`/products/${productId}`)
      .set('access_token', access_token)
      .send({
        name: 'Naiki Zoo Shoes',
        image_url: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/i1-728eb69b-04be-4f07-8483-15f4829d4cb5/air-max-2090-mens-shoe-3pVM46.jpg',
        price: '',
        stock: 50
      })
      .then(res => {
        const { body, status } = res
        expect(status).toBe(400)
        expect(body).toHaveProperty('msg', 'Price cannot be empty!')
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })

  it('Test edit name empty', (done) => {
    request(app)
      .put(`/products/${productId}`)
      .set('access_token', access_token)
      .send({
        name: 'Naiki Zoo Shoes',
        image_url: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/i1-728eb69b-04be-4f07-8483-15f4829d4cb5/air-max-2090-mens-shoe-3pVM46.jpg',
        price: 1599000,
        stock: ''
      })
      .then(res => {
        const { body, status } = res
        expect(status).toBe(400)
        expect(body).toHaveProperty('msg', 'Stock cannot be empty!')
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })

  it('Test edit name empty', (done) => {
    request(app)
      .put(`/products/${productId}`)
      .set('access_token', access_token)
      .send({
        name: 'Naiki Zoo Shoes',
        image_url: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/i1-728eb69b-04be-4f07-8483-15f4829d4cb5/air-max-2090-mens-shoe-3pVM46.jpg',
        price: -2000000,
        stock: 50
      })
      .then(res => {
        const { body, status } = res
        expect(status).toBe(400)
        expect(body).toHaveProperty('msg', 'Price cannot be a negative value!')
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })

  it('Test edit name empty', (done) => {
    request(app)
      .put(`/products/${productId}`)
      .set('access_token', access_token)
      .send({
        name: 'Naiki Zoo Shoes',
        image_url: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/i1-728eb69b-04be-4f07-8483-15f4829d4cb5/air-max-2090-mens-shoe-3pVM46.jpg',
        price: 2000000,
        stock: -50
      })
      .then(res => {
        const { body, status } = res
        expect(status).toBe(400)
        expect(body).toHaveProperty('msg', 'Stock cannot be a negative value!')
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
})

describe('DELETE /products/:id', () => {
  it('Test delete data success', (done) => {
    request(app)
      .delete('/products/' + productId)
      .set('access_token', access_token)
      .then(res => {
        const { body, status } = res
        expect(status).toBe(200)
        expect(body).toHaveProperty('msg', 'Successfully deleted product!')
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })

  it('Test delete authentication failed', (done) => {
    request(app)
      .delete('/products/' + productId)
      .then(res => {
        const { body, status } = res
        expect(status).toBe(401)
        expect(body).toHaveProperty('msg', 'Authentication failed! You have to login first')
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
  
  it('Test delete authorization failed', (done) => {
    request(app)
    .delete('/products/' + productId)
      .set('access_token', nonAdminToken)
      .then(res => {
        const { body, status } = res
        expect(status).toBe(401)
        expect(body).toHaveProperty('msg', 'Authorization failed! You cannot access this data')
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
})