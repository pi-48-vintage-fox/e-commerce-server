const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { User, Product } = require('../models')
const { signToken } = require('../helpers/jwt')
const { queryInterface } = sequelize


// Success Create CRUD

describe("Test Success Crud products", () => {
  it("Test success Post Products", (done) => {
    request(app)
    .get('/products')
    .send({
      name : "Sepatu Nike",
      image_url : "https://awsimages.detik.net.id/community/media/visual/2019/01/17/f31f05dd-5e6b-42f7-969d-c03ab4540729_169.jpeg?w=620",
      price : 1000000,
      stock : 5
    })
    .set('access_token', access_token)
    .then((response) => {
      let { body, status } = response
      expect(status).toBe(200)
      expect(response).toHaveProperty("body", expect.any(Object))
      done()
    })
    .catch(err => {
      done()
    })
  })
})

describe("Test Success Crud products", () => {
  it("Test success Post Products", (done) => {
    request(app)
    .post('/products')
    .send({
      name : "Sepatu Nike",
      image_url : "https://awsimages.detik.net.id/community/media/visual/2019/01/17/f31f05dd-5e6b-42f7-969d-c03ab4540729_169.jpeg?w=620",
      price : 1000000,
      stock : 5
    })
    .set('access_token', access_token)
    .then((response) => {
      let { body, status } = response
      expect(status).toBe(200)
      expect(response).toHaveProperty("body", expect.any(Object))
      done()
    })
    .catch(err => {
      done()
    })
  })
})

describe("Test Success Crud products", () => {
  it("Test success Post Products", (done) => {
    request(app)
    .put('/products/2')
    .send({
      name : "Sepatu Nike",
      image_url : "https://awsimages.detik.net.id/community/media/visual/2019/01/17/f31f05dd-5e6b-42f7-969d-c03ab4540729_169.jpeg?w=620",
      price : 1000000,
      stock : 5
    })
    .set('access_token', access_token)
    .then((response) => {
      let { body, status } = response
      expect(status).toBe(200)
      expect(response).toHaveProperty("body", expect.any(Object))
      done()
    })
    .catch(err => {
      done()
    })
  })
})

describe("Test Success Crud products", () => {
  it("Test success Post Products", (done) => {
    request(app)
    .delete('/products')
    .set('access_token', access_token)
    .then((response) => {
      let { body, status } = response
      expect(status).toBe(200)
      expect(response).toHaveProperty("body", expect.any(Object))
      done()
    })
    .catch(err => {
      done()
    })
  })
})

// Create Failed

describe("Test failed CRUD products", () => {
  it("Test failed without access_token", (done) => {
    request(app)
    .post('/products')
    .send({
      name : "Sepatu Nike",
      image_url : "https://awsimages.detik.net.id/community/media/visual/2019/01/17/f31f05dd-5e6b-42f7-969d-c03ab4540729_169.jpeg?w=620",
      price : 1000000,
      stock : 5
    })
    .then((response) => {
      let { body, status } = response
      expect(status).toBe(400)
      expect(body).toHaveProperty(Object.keys(response.body))
      done()
    })
    .catch(err => {
      done()
    })
  })
})

describe("Test failed CRUD Products", () => {
  it("Test failed with empty field", (done) => {
    request(app)
    .post('/products')
    .send({
      name : "",
      image_url : "",
      price : 500000,
      stock : 2
    })
    .set("access_token", access_token)
    .then((response) => {
      let { body, status } = response
      expect(status).toBe(400)
      expect(body).toHaveProperty(Object.keys(response.body))
      done()
    })
    .catch(err => {
      done()
    })
  })
})

describe("Test failed CRUD Products", () => {
  it("Test failed with stock minus", (done) => {
    request(app)
    .post('/products')
    .send({
      name : "Sepatu Nike",
      image_url : "https://awsimages.detik.net.id/community/media/visual/2019/01/17/f31f05dd-5e6b-42f7-969d-c03ab4540729_169.jpeg?w=620",
      price : 1000000,
      stock : -1
    })
    .set("access_token", access_token)
    .then((response) => {
      let { body, status } = response
      expect(status).toBe(400)
      expect(body).toHaveProperty(Object.keys(response.body))
      done()
    })
    .catch(err => {
      done()
    })
  })
})

describe("Test failed CRUD Products", () => {
  it("test failed with price minus", (done) => {
    request(app)
    .post('/products')
    .send({
      name : "Sepatu Nike",
      image_url : "https://awsimages.detik.net.id/community/media/visual/2019/01/17/f31f05dd-5e6b-42f7-969d-c03ab4540729_169.jpeg?w=620",
      price : -1000000,
      stock : 10
    })
    .then((response) => {
      let { body, status } = response
      expect(status).toBe(400)
      expect(body).toHaveProperty(Object.keys(response.body))
      done()
    })
    .catch(err => {
      done()
    })
  })
})

describe("Test failed CRUD Products", () => {
  it("test failed with different types", (done) => {
    request(app)
    .post('/products')
    .send({
      name : "Sepatu Nike",
      image_url : "https://awsimages.detik.net.id/community/media/visual/2019/01/17/f31f05dd-5e6b-42f7-969d-c03ab4540729_169.jpeg?w=620",
      price : 1000000,
      stock : "integer"
    })
    .set("access_token", access_token)
    .then((response) => {
      let { body, status } = response
      expect(status).toBe(400)
      expect(body).toHaveProperty(Object.keys(response.body))
      done()
    })
    .catch(err => {
      done()
    })
  })
})

//Update Failed

describe("Test failed CRUD Products", () => {
  it("test failed without access_token", (done) => {
    request(app)
    .put('/products/2')
    .send({
      name : "Sepatu Adidas",
      image_url : "https://ecs7.tokopedia.net/img/cache/700/product-1/2018/12/3/4887182/4887182_5b9f9a5f-0a9c-4aae-8e73-4e99dd6d997d_700_700.jpg.webp",
      price : 1000000,
      stock : 5
    })
    .then((response) => {
      let { body, status } = response
      expect(status).toBe(400)
      expect(body).toHaveProperty(Object.keys(response.body))
      done()
    })
    .catch(err => {
      done()
    })
  })
})

describe("Test failed CRUD Products", () => {
  it("test failed with minus stock", (done) => {
    response(app)
    .put('/products/2')
    .send({
      name : "Sepatu Adidas",
      image_url : "https://ecs7.tokopedia.net/img/cache/700/product-1/2018/12/3/4887182/4887182_5b9f9a5f-0a9c-4aae-8e73-4e99dd6d997d_700_700.jpg.webp",
      price : 1000000,
      stock : -5
    })
    .set("access_token", access_token)
    .then((response) => {
      let { body, status } = response
      expect(status).toBe(400)
      expect(body).toHaveProperty(Object.keys(response.body))
      done()
    })
    .catch(err => {
      done()
    })
  })
})

describe("Test failed CRUD Products", () => {
  it("test failed with minus price", (done) => {
    response(app)
    .put('/products/2')
    .send({
      name : "Sepatu Adidas",
      image_url : "https://ecs7.tokopedia.net/img/cache/700/product-1/2018/12/3/4887182/4887182_5b9f9a5f-0a9c-4aae-8e73-4e99dd6d997d_700_700.jpg.webp",
      price : -1000000,
      stock : 5
    })
    .set("access_token", access_token)
    .then((response) => {
      let { body, status } = response
      expect(status).toBe(400)
      expect(body).toHaveProperty(Object.keys(response.body))
      done()
    })
    .catch(err => {
      done()
    })
  })
})

describe("Test failed CRUD Products", () => {
  it("test failed with different types", (done) => {
    request(app)
    .put('/products')
    .send({
      name : "Sepatu Nike",
      image_url : "https://awsimages.detik.net.id/community/media/visual/2019/01/17/f31f05dd-5e6b-42f7-969d-c03ab4540729_169.jpeg?w=620",
      price : 1000000,
      stock : "integer"
    })
    .set("access_token", access_token)
    .then((response) => {
      let { body, status } = response
      expect(status).toBe(400)
      expect(body).toHaveProperty(Object.keys(response.body))
      done()
    })
    .catch(err => {
      done()
    })
  })
})

// Delete Failed

describe("test failed CRUD Products", () => {
  it("test failed without access_token", (done) => {
    request(app)
    .delete('/products/2')
    .send({
      name : "Sepatu Adidas",
      image_url : "https://ecs7.tokopedia.net/img/cache/700/product-1/2018/12/3/4887182/4887182_5b9f9a5f-0a9c-4aae-8e73-4e99dd6d997d_700_700.jpg.webp",
      price : 1000000,
      stock : 5
    })
    .then((response) => {
      let {body, status} = response
      expect(status).toBe(401)
      expect(body).toHaveProperty(Object.keys(response.body))
      done()
    })
    .catch(err => {
      done()
    })
  })
})