const request = require("supertest")
const app = require("../app")
const { createdToken } = require("../helper/jwt")
const { User } = require("../models/index")
const { sequelize } = require('../models')
const { queryInterface } = sequelize

let access_token = ''

beforeAll((done) => {
    User.findOne({
      where: {
        email: 'admin@mail.com'
      }
    })
    .then(user => {
       access_token = createdToken({
          id: user.id,
          email: user.email
        })
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

describe("test success endpoint product", () => {
    
    it("test post product", (done) => {
        request(app)
        .post("/product")
        .set({access_token})
        .send({
            name: "Baju Wanita",
            image_url: "https://cf.shopee.co.id/file/62b08941de80bea161e2598cc02f5280",
            price: 150000,
            stock: 5,
            CategoryId: 8
        })
        .then(response => {
            const { status, body } = response
            expect(status).toBe(201)
            expect(body).toHaveProperty("name", "Baju Wanita")
            expect(body).toHaveProperty("image_url", "https://cf.shopee.co.id/file/62b08941de80bea161e2598cc02f5280")
            expect(body).toHaveProperty("price", 150000)
            expect(body).toHaveProperty("CategoryId", 8)
            done()
        })
        .catch(err => {
            console.log(err);
        })
    })

    it("test put product", (done) => {
        request(app)
        .put("/product/32")
        .set({access_token})
        .send({
            name: "Baju Wanita Lengan Panjang",
            image_url: "https://cf.shopee.co.id/file/62b08941de80bea161e2598cc02f5280",
            price: 150000,
            stock: 5,
            CategoryId: 8
        })
        .then(response => {
            const { status, body } = response
            expect(status).toBe(200)
            expect(body).toHaveProperty("name", "Baju Wanita Lengan Panjang")
            expect(body).toHaveProperty("image_url", "https://cf.shopee.co.id/file/62b08941de80bea161e2598cc02f5280")
            expect(body).toHaveProperty("price", 150000)
            expect(body).toHaveProperty("CategoryId", 8)
            done()
        })
        .catch(err => {
            console.log(err);
        })
    })

    it("test get all product", (done) => {
        request(app)
        .get("/product")
        .set({access_token})
        .then(response => {
            const { status } = response
            const { body } = response
            expect(status).toBe(200)
            expect(Array.isArray(body)).toBeTruthy()
            done()
        })
        .catch(err => {
            console.log(err);
        })
    })

    it("test delete product", (done) => {
        request(app)
        .delete("/product/32")
        .set({access_token})
        .then(response => {
            const { status, body } = response
            expect(status).toBe(200)
            expect(body).toHaveProperty("message", "Item deleted successfuly")
            done()
        })
        .catch(err => {
            console.log(err);
        })
    })

})


