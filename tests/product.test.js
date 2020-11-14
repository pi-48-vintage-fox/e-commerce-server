const request = require('supertest')
const app = require('../app')
const { User, Product } = require('../models')
const { signToken } = require('../helpers/jwt')


const user = { email: "admin@mail.com", password : "bimobimo", role: "Admin" }
const user2 = { email: "sahaieu@mail.com", password : "naonieuteh", role: "Customer" }

let access_token
let token

beforeAll((done) => {
  User.create(user)
  .then((data) => {
    const user = {
      id : data.id,
      email : data.email
    }
    access_token = signToken(user)
    return User.create(user2)
  })
  .then((data) => {
    const user2 = {
      id : data.id,
      email : data.email
    }
    token = signToken(user2)
    return done()
  })
  .catch(err =>{
    return done(err)
  })
})

afterAll((done) => {
  User.destroy({
    truncate : true
  })
  .then(_ => {
    return Product.destroy({
      truncate : true
    })
  })
  .then(_ => {
    return done()
  })
  .catch(err =>{
    return done(err)
  })

})


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
      done(err)
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
      done(err)
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
      done(err)
    })
  })
})

describe("Test Success Crud products", () => {
  it("Test success Post Products", (done) => {
    request(app)
    .delete('/products/2')
    .set('access_token', access_token)
    .then((response) => {
      let { body, status } = response
      expect(status).toBe(200)
      expect(response).toHaveProperty("body", expect.any(Object))
      done()
    })
    .catch(err => {
      done(err)
    })
  })
})

// // Create Failed

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
      expect(status).toBe(401)
      expect(body).toHaveProperty("errors", expect.any(Array))
      done()
    })
    .catch(err => {
      done(err)
    })
  })
})

describe("Test Success Crud products", () => {
  it("Test failed role not Admin Post Products", (done) => {
    request(app)
    .post('/products')
    .send({
      name : "Sepatu Nike",
      image_url : "https://awsimages.detik.net.id/community/media/visual/2019/01/17/f31f05dd-5e6b-42f7-969d-c03ab4540729_169.jpeg?w=620",
      price : 1000000,
      stock : 5
    })
    .set('access_token', token)
    .then((response) => {
      let { body, status } = response
      expect(status).toBe(401)
      expect(response).toHaveProperty("body", expect.any(Object))
      done()
    })
    .catch(err => {
      return done(err)
    })
  })
})


describe("Test failed CRUD Products", () => {
  it("Test failed with empty field", (done) => {
    request(app)
    .post('/products')
    .send({
      name : "Sepatu",
      image_url : "",
      price : 500000,
      stock : 2
    })
    .set("access_token", access_token)
    .then((response) => {
      let { body, status } = response
      expect(status).toBe(400)
      expect(body).toHaveProperty("errors", expect.any(Array))
      done()
    })
    .catch(err => {
      done(err)
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
      done(err)
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
    .set("access_token", access_token)
    .then((response) => {
      let { body, status } = response
      expect(status).toBe(400)
      expect(body).toHaveProperty(Object.keys(response.body))
      done()
    })
    .catch(err => {
      done(err)
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
      done(err)
    })
  })
})

// //Update Failed

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
      expect(status).toBe(401)
      expect(body).toHaveProperty(Object.keys(response.body))
      done()
    })
    .catch(err => {
      done(err)
    })
  })
})

describe("Test failed CRUD products", () => {
  it("Test failed  role not Admin Put Products", (done) => {
    request(app)
    .put('/products/2')
    .send({
      name : "Sepatu Nike",
      image_url : "https://awsimages.detik.net.id/community/media/visual/2019/01/17/f31f05dd-5e6b-42f7-969d-c03ab4540729_169.jpeg?w=620",
      price : 1000000,
      stock : 5
    })
    .set('access_token', token)
    .then((response) => {
      let { body, status } = response
      expect(status).toBe(401)
      expect(response).toHaveProperty("body", expect.any(Object))
      done()
    })
    .catch(err => {
      done(err)
    })
  })
})

describe("Test failed CRUD Products", () => {
  it("test failed with minus stock", (done) => {
    request(app)
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
      done(err)
    })
  })
})

describe("Test failed CRUD Products", () => {
  it("test failed with minus price", (done) => {
    request(app)
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
      done(err)
    })
  })
})

describe("Test failed CRUD Products", () => {
  it("test failed with different types", (done) => {
    request(app)
    .put('/products/2')
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
      done(err)
    })
  })
})

// // Delete Failed

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
      done(err)
    })
  })
})