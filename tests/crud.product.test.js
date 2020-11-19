'use strict'
const request = require("supertest")
const app = require("../app")
const { User, sequelize } = require("../models")
const { signToken } = require("../helpers/jwt")
const { queryInterface } = sequelize

let access_token_admin = ""
let access_token_user = ""
let currentProductId

beforeAll(async (done) => {
  try {
    let admin = await User.findOne({
      where: {
        email: 'admin@admin.com'
      }
    })
    access_token_admin = signToken({
      id: admin.id,
      email: admin.email
    })

    let user = await User.findOne({
      where: {
        email: 'test1@email.com'
      }
    })
    access_token_user = signToken({
      id: user.id,
      email: user.email
    })
    done()
  } catch (error) {
    done()
  }
})

afterAll(async (done) => {
  try {
    await queryInterface.bulkDelete('Products')
    done()
  } catch (error) {
    done()
  }
})

describe("[Success Case] Product", () => {
  it("[Success Case] Product Created -> POST /products", done => {
    request(app)
      .post("/products")
      .send({
        name: "Product test 1",
        image_url: "https://www.seventhgeneration.com/sites/default/files/styles/1600w/public/2020-07/mbcampaign-hp-productcarouselpersonalcare-998x790.jpg",
        price: 50000,
        stock: 20,
        descriptions: "Bodywash set with jojoba oil and crude oil"
      })
      .set('Accept', 'application/json')
      .set('access_token', access_token_admin)
      .expect('Content-type', /json/)
      .then(response => {
        let { body, status } = response
        expect(status).toBe(200)
        expect(body).toHaveProperty("msg", "Product added")
        expect(body).toHaveProperty("product", expect.objectContaining({
          name: "Product test 1",
          image_url: "https://www.seventhgeneration.com/sites/default/files/styles/1600w/public/2020-07/mbcampaign-hp-productcarouselpersonalcare-998x790.jpg",
          price: 50000,
          stock: 20,
          descriptions: "Bodywash set with jojoba oil and crude oil"
        }))
        currentProductId = body.product.id
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it("[Success Case] Product Updated -> PUT /products/1", done => {
    request(app)
      .put("/products/" + currentProductId)
      .send({
        name: "Product test 1",
        image_url: "https://www.seventhgeneration.com/sites/default/files/styles/1600w/public/2020-07/mbcampaign-hp-productcarouselpersonalcare-998x790.jpg",
        price: 530000,
        stock: 20,
        descriptions: "Bodywash set with jojoba oil and crude oil"
      })
      .set('Accept', 'application/json')
      .set('access_token', access_token_admin)
      .expect('Content-type', /json/)
      .then(response => {
        let { body, status } = response
        expect(status).toBe(200)
        expect(body).toHaveProperty("msg", "Product updated")
        expect(body).toHaveProperty("product", expect.objectContaining({
          name: "Product test 1",
          image_url: "https://www.seventhgeneration.com/sites/default/files/styles/1600w/public/2020-07/mbcampaign-hp-productcarouselpersonalcare-998x790.jpg",
          price: 530000,
          stock: 20,
          descriptions: "Bodywash set with jojoba oil and crude oil"
        }))
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it("[Success Case] Product Deleted -> DELETE /products/1", done => {
    request(app)
      .delete("/products/" + currentProductId)
      .set('Accept', 'application/json')
      .set('access_token', access_token_admin)
      .expect('Content-type', /json/)
      .then(response => {
        let { body, status } = response
        expect(status).toBe(200)
        expect(body).toHaveProperty("msg", "Product deleted")
        expect(body).toHaveProperty("product", expect.objectContaining({
          id: currentProductId
        }))
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})

describe("[Fail Case] Create Product Failed case for endpoint POST /products", () => {
  it('[Fail Case] Tidak ada access_token', done => {
    request(app)
      .post("/products")
      .send({
        name: "Product test 1",
        image_url: "https://www.seventhgeneration.com/sites/default/files/styles/1600w/public/2020-07/mbcampaign-hp-productcarouselpersonalcare-998x790.jpg",
        price: 50000,
        stock: 20,
        descriptions: "Bodywash set with jojoba oil and crude oil"
      })
      .set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .then(response => {
        let { body, status } = response
        expect(status).toBe(401)
        expect(body).toHaveProperty("msg", "Not Authenticated")
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it('[Fail Case] Tidak dapat akses jika access_token bukan milik admin', done => {
    request(app)
      .post("/products")
      .send({
        name: "Product test 1",
        image_url: "https://www.seventhgeneration.com/sites/default/files/styles/1600w/public/2020-07/mbcampaign-hp-productcarouselpersonalcare-998x790.jpg",
        price: 50000,
        stock: 20,
        descriptions: "Bodywash set with jojoba oil and crude oil"
      })
      .set('Accept', 'application/json')
      .set("access_token", access_token_user)
      .expect('Content-type', /json/)
      .then(response => {
        let { body, status } = response
        expect(status).toBe(401)
        expect(body).toHaveProperty("msg", "Not Authenticated")
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it("[Fail Case] Field required tidak di isi", done => {
    request(app)
      .post("/products")
      .send({
        name: "",
        image_url: "",
        stock: null,
        price: null,
        descriptions: ""
      })
      .set("access_token", access_token_admin)
      .set("Accept", "application/json")
      .expect("Content-type", /json/)
      .then(response => {
        let { body, status } = response                                
        let expectedMessages = ["Name is required", "Image Url is required", "Descriptions is required"]
        expect(status).toBe(400)
        expect(body).toHaveProperty("msg", expect.arrayContaining(expectedMessages))
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it("[Fail Case] Stock tidak bisa di isi angka minus", done => {
    request(app)
      .post("/products")
      .send({
        name: "Product test 1",
        image_url: "https://www.seventhgeneration.com/sites/default/files/styles/1600w/public/2020-07/mbcampaign-hp-productcarouselpersonalcare-998x790.jpg",
        price: 50000,
        stock: -9,
        descriptions: "Bodywash set with jojoba oil and crude oil"
      })
      .set("access_token", access_token_admin)
      .set("Accept", "application/json")
      .expect("Content-type", /json/)
      .then(response => {
        let { body, status } = response
        expect(status).toBe(400)
        let expectedMessages = ["Stock must be greater than 0"]
        expect(body).toHaveProperty("msg", expect.arrayContaining(expectedMessages))
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it("[Fail Case] Price tidak bisa di isi angka minus", done => {
    request(app)
      .post("/products")
      .send({
        name: "Product test 1",
        image_url: "https://www.seventhgeneration.com/sites/default/files/styles/1600w/public/2020-07/mbcampaign-hp-productcarouselpersonalcare-998x790.jpg",
        price: -50000,
        stock: 9,
        descriptions: "Bodywash set with jojoba oil and crude oil"
      })
      .set("access_token", access_token_admin)
      .set("Accept", "application/json")
      .expect("Content-type", /json/)
      .then(response => {
        let { body, status } = response
        expect(status).toBe(400)
        let expectedMessages = ["Price must be greater than 0"]
        expect(body).toHaveProperty("msg", expect.arrayContaining(expectedMessages))
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it("[Fail Case] Field di isi dengan tipe data yg tidak sesuai", done => {
    request(app)
      .post("/products")
      .send({
        name: "sabun man ?",
        image_url: "asasd",
        price: "asd",
        stock: "asd",
        descriptions: "ini adalah pusing"
      })
      .set("access_token", access_token_admin)
      .set("Accept", "application/json")
      .expect("Content-type", /json/)
      .then(response => {
        let { body, status } = response
        let expectedMessages = ["Stock must be a number", "Price must be a number", "Image Url must be an url"]
        expect(status).toBe(400)
        expect(body).toHaveProperty("msg", expect.arrayContaining(expectedMessages))
        done()
      })
      .catch(err => {
        done(err)
      })
  })

})

describe("[Fail Case] Update Product Failed case for endpoint PUT /products/:id", () => {
  it('[Fail Case] Tidak ada access_token', done => {
    request(app)
      .put("/products/1")
      .send({
        name: "Product test 1",
        image_url: "https://www.seventhgeneration.com/sites/default/files/styles/1600w/public/2020-07/mbcampaign-hp-productcarouselpersonalcare-998x790.jpg",
        price: 50000,
        stock: 20,
        descriptions: "Bodywash set with jojoba oil and crude oil"
      })
      .set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .then(response => {
        let { body, status } = response
        expect(status).toBe(401)
        expect(body).toHaveProperty("msg", "Not Authenticated")
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it('[Fail Case] access_token bukan milik admin', done => {
    request(app)
      .put("/products/1")
      .send({
        name: "Product test 1",
        image_url: "https://www.seventhgeneration.com/sites/default/files/styles/1600w/public/2020-07/mbcampaign-hp-productcarouselpersonalcare-998x790.jpg",
        price: 50000,
        stock: 20,
        descriptions: "Bodywash set with jojoba oil and crude oil"
      })
      .set('Accept', 'application/json')
      .set("access_token", access_token_user)
      .expect('Content-type', /json/)
      .then(response => {
        let { body, status } = response
        expect(status).toBe(401)
        expect(body).toHaveProperty("msg", "Not Authenticated")
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it("[Fail Case] Stock tidak bisa di isi angka minus", done => {
    request(app)
      .put("/products/1")
      .send({
        name: "Product test 1",
        image_url: "https://www.seventhgeneration.com/sites/default/files/styles/1600w/public/2020-07/mbcampaign-hp-productcarouselpersonalcare-998x790.jpg",
        price: 50000,
        stock: -9,
        descriptions: "Bodywash set with jojoba oil and crude oil"
      })
      .set("access_token", access_token_admin)
      .set("Accept", "application/json")
      .expect("Content-type", /json/)
      .then(response => {
        let { body, status } = response
        let expectedMessages = ['Stock must be greater than 0']
        expect(status).toBe(400)
        expect(body).toHaveProperty("msg", expect.arrayContaining(expectedMessages))
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it("[Fail Case] Price tidak bisa di isi angka minus", done => {
    request(app)
      .put("/products/1")
      .send({
        name: "Product test 1",
        image_url: "https://www.seventhgeneration.com/sites/default/files/styles/1600w/public/2020-07/mbcampaign-hp-productcarouselpersonalcare-998x790.jpg",
        price: -50000,
        stock: 9,
        descriptions: "Bodywash set with jojoba oil and crude oil"
      })
      .set("access_token", access_token_admin)
      .set("Accept", "application/json")
      .expect("Content-type", /json/)
      .then(response => {
        let { body, status } = response
        let expectedMessages = ['Price must be greater than 0']
        expect(status).toBe(400)
        expect(body).toHaveProperty("msg", expect.arrayContaining(expectedMessages))
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it("[Fail Case] Field di isi dengan tipe data yg tidak sesuai", done => {
    request(app)
      .put("/products/1")
      .send({
        name: 123,
        image_url: "asd",
        price: "asd",
        stock: "asd",
        descriptions: 123
      })
      .set("access_token", access_token_admin)
      .set("Accept", "application/json")
      .expect("Content-type", /json/)
      .then(response => {
        let { body, status } = response
        let expectedMessages = ["Stock must be a number", "Price must be a number", "Image Url must be an url"]
        expect(status).toBe(400)
        expect(body).toHaveProperty("msg", expect.arrayContaining(expectedMessages))
        done()
      })
      .catch(err => {

        done(err)
      })
  })

})

describe('[Fail Case] Delete Product Failed case for endpoint DELETE /products/:id', () => {
  it('[Fail Case] Tidak ada access_token', done => {
    request(app)
      .delete("/products/1")
      .send({
        name: "Product test 1",
        image_url: "https://www.seventhgeneration.com/sites/default/files/styles/1600w/public/2020-07/mbcampaign-hp-productcarouselpersonalcare-998x790.jpg",
        price: 50000,
        stock: 20,
        descriptions: "Bodywash set with jojoba oil and crude oil"
      })
      .set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .then(response => {
        let { body, status } = response
        expect(status).toBe(401)
        expect(body).toHaveProperty("msg", "Not Authenticated")
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it('[Fail Case] access_token bukan milik admin', done => {
    request(app)
      .delete("/products/1")
      .send({
        name: "Product test 1",
        image_url: "https://www.seventhgeneration.com/sites/default/files/styles/1600w/public/2020-07/mbcampaign-hp-productcarouselpersonalcare-998x790.jpg",
        price: 50000,
        stock: 20,
        descriptions: "Bodywash set with jojoba oil and crude oil"
      })
      .set('Accept', 'application/json')
      .set("access_token", access_token_user)
      .expect('Content-type', /json/)
      .then(response => {
        let { body, status } = response
        expect(status).toBe(401)
        expect(body).toHaveProperty("msg", "Not Authenticated")
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})