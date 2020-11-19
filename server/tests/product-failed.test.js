const request = require("supertest")
const app = require("../app")
const { createdToken } = require("../helper/jwt")
const { User } = require("../models/index")
const { sequelize } = require('../models')
const { queryInterface } = sequelize

let access_token = ''
let access_token_user = ''

beforeAll((done) => {
    User.findOne({
      where: {
          email: 'admin@mail.com'
        }
    })
    .then(userAdmin => {
        // console.log(userAdmin,"<<userAdmin");
        access_token = createdToken({
            id: userAdmin.id,
          email: userAdmin.email
        })
        // console.log(access_token, "<<punya admin");
       return User.findOne({
            where: {
                email: 'user@mail.com'
            }
        })
    })
    .then(user => {
        // console.log(user, "<<user");
       access_token_user = createdToken({
          id: user.id,
          email: user.email
        })
        // console.log(access_token_user, "<<punya user");
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

describe("test failed endpoint create product", () => {

    it("tidak menyertakan access_token", (done) => {
        request(app)
        .post("/product")
        .send({
            name: "Baju Wanita",
            image_url: "https://cf.shopee.co.id/file/62b08941de80bea161e2598cc02f5280",
            price: 150000,
            stock: 5,
            CategoryId: 8
        })
        .then(response => {
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "access_token is required")
            done()
        })
        .catch(err => {
            console.log(err);
        })
    })


    it("menyertakan access_token bukan admin", (done) => {
        request(app)
        .post("/product")
        .set("access_token", access_token_user)
        .send({
            name: "Baju Wanita",
            image_url: "https://cf.shopee.co.id/file/62b08941de80bea161e2598cc02f5280",
            price: 150000,
            stock: 5,
            CategoryId: 8
        })
        .then(response => {

            const { status, body } = response
            expect(status).toBe(404)
            expect(body).toBe("not Authorization")
            done()
        })
        .catch(err => {
            console.log(err);
        })
    })

    it("field required tidak diisi", (done) => {
        request(app)
        .post("/product")
        .set({access_token})
        .send({
            name: "",
            image_url: "https://cf.shopee.co.id/file/62b08941de80bea161e2598cc02f5280",
            price: 150000,
            stock: 5,
            CategoryId: 8
        })
        .then(response => {
         
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toBe("Validation error: name is required")
            done()
        })
        .catch(err => {
            console.log(err);
        })
    })

    it("stock diisi angka minus", (done) => {
        request(app)
        .post("/product")
        .set({access_token})
        .send({
            name: "Baju Wanita",
            image_url: "https://cf.shopee.co.id/file/62b08941de80bea161e2598cc02f5280",
            price: 150000,
            stock: -5,
            CategoryId: 8
        })
        .then(response => {
         
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toBe("Validation error: Input stock minimal 1 pcs")
            done()
        })
        .catch(err => {
            console.log(err);
        })
    })

    it("price diisi angka minus", (done) => {
        request(app)
        .post("/product")
        .set({access_token})
        .send({
            name: "Baju Wanita",
            image_url: "https://cf.shopee.co.id/file/62b08941de80bea161e2598cc02f5280",
            price: -150000,
            stock: 5,
            CategoryId: 8
        })
        .then(response => {
         
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toBe("Validation error: Input price must be greater than 0")
            done()
        })
        .catch(err => {
            console.log(err);
        })
    })

    it("stock diisi string", (done) => {
        request(app)
        .post("/product")
        .set({access_token})
        .send({
            name: "Baju Wanita",
            image_url: "https://cf.shopee.co.id/file/62b08941de80bea161e2598cc02f5280",
            price: 150000,
            stock: "abcde",
            CategoryId: 8
        })
        .then(response => {
         
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toBe("Validation error: must input by number")
            done()
        })
        .catch(err => {
            console.log(err);
        })
    })
})

describe("test endpoint update failed product", () => {

    it("tidak menyertakan access_token", (done) => {
        request(app)
        .put("/product/31")
        .send({
            name: "Baju Wanita",
            image_url: "https://cf.shopee.co.id/file/62b08941de80bea161e2598cc02f5280",
            price: 150000,
            stock: 5,
            CategoryId: 8
        })
        .then(response => {
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "access_token is required")
            done()
        })
        .catch(err => {
            console.log(err);
        })
    })

    it("menyertakan access_token bukan admin", (done) => {
        request(app)
        .put("/product/31")
        .set("access_token", access_token_user)
        .send({
            name: "Baju Wanita",
            image_url: "https://cf.shopee.co.id/file/62b08941de80bea161e2598cc02f5280",
            price: 150000,
            stock: 5,
            CategoryId: 8
        })
        .then(response => {

            const { status, body } = response
            expect(status).toBe(404)
            expect(body).toBe("not Authorization")
            done()
        })
        .catch(err => {
            console.log(err);
        })
    })

    it("stock diisi angka minus", (done) => {
        request(app)
        .put("/product/31")
        .set({access_token})
        .send({
            name: "Baju Wanita",
            image_url: "https://cf.shopee.co.id/file/62b08941de80bea161e2598cc02f5280",
            price: 150000,
            stock: -5,
            CategoryId: 8
        })
        .then(response => {
   
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toBe("Validation error: Input stock minimal 1 pcs")
            done()
        })
        .catch(err => {
            console.log(err);
        })
    })

    it("stock diisi string", (done) => {
        request(app)
        .put("/product/31")
        .set({access_token})
        .send({
            name: "Baju Wanita",
            image_url: "https://cf.shopee.co.id/file/62b08941de80bea161e2598cc02f5280",
            price: 150000,
            stock: "abcde",
            CategoryId: 8
        })
        .then(response => {
         
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toBe("Validation error: must input by number")
            done()
        })
        .catch(err => {
            console.log(err);
        })
    })

    it("price diisi angka minus", (done) => {
        request(app)
        .put("/product/31")
        .set({access_token})
        .send({
            name: "Baju Wanita",
            image_url: "https://cf.shopee.co.id/file/62b08941de80bea161e2598cc02f5280",
            price: -150000,
            stock: 5,
            CategoryId: 8
        })
        .then(response => {
         
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toBe("Validation error: Input price must be greater than 0")
            done()
        })
        .catch(err => {
            console.log(err);
        })
    })
})

describe("test failed endpoint delete product", () => {

    it("tidak menyertakan access_token", (done) => {
        request(app)
        .delete("/product/31")
        .send({
            name: "Baju Wanita",
            image_url: "https://cf.shopee.co.id/file/62b08941de80bea161e2598cc02f5280",
            price: 150000,
            stock: 5,
            CategoryId: 8
        })
        .then(response => {
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "access_token is required")
            done()
        })
        .catch(err => {
            console.log(err);
        })
    })

    it("menyertakan access_token bukan admin", (done) => {
        request(app)
        .delete("/product/31")
        .set("access_token", access_token_user)
        .send({
            name: "Baju Wanita",
            image_url: "https://cf.shopee.co.id/file/62b08941de80bea161e2598cc02f5280",
            price: 150000,
            stock: 5,
            CategoryId: 8
        })
        .then(response => {

            const { status, body } = response
            expect(status).toBe(404)
            expect(body).toBe("not Authorization")
            done()
        })
        .catch(err => {
            console.log(err);
        })
    })
})

