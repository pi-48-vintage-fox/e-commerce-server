const request = require("supertest")
const app = require("../app")

describe("test post endpoint /login", () => {
    it("test login success", (done) => {
        request(app)
        .post("/login")
        .send({email: "admin@mail.com", password: "123456"})
        .then(response => {
            const { status,body } = response
            expect(status).toBe(200)
            expect(body).toHaveProperty("access_token", expect.any(String))
            done()
        })
        .catch(err => {
            console.log(err);
        })
    }) 

    it("test login failed salah password", (done) => {
        request(app)
        .post("/login")
        .send({email: "admin@mail.com", password: "1234566"})
        .then(response => {
            console.log(response.body);
            const { status, body } = response
            expect(status).toBe(401)
            expect(body).toBe("Invalid Username/ Password")
            done()
        })
        .catch(err => {
            console.log(err);
        })
    })

    it("test login failed email tidak ada di db", (done) => {
        request(app)
        .post("/login")
        .send({email: "yogi@mail.com", password: "123456"})
        .then(response => {
            console.log(response.body);
            const { status, body } = response
            expect(status).toBe(401)
            expect(body).toBe("Invalid Username/ Password")
            done()
        })
        .catch(err => {
            console.log(err);
        })
    })

    it("test login failed tidak memasukkan email dan password", (done) => {
        request(app)
        .post("/login")
        .send({email: "", password: ""})
        .then(response => {
            console.log(response.body);
            const { status, body } = response
            expect(status).toBe(401)
            expect(body).toBe("Invalid Username/ Password")
            done()
        })
        .catch(err => {
            console.log(err);
        })
    })
})
