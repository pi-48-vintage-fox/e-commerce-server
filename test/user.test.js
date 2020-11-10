const request = require('supertest');
const app = require('../app');
const {sequelize} = require('../models/index');
const {queryInterface} = sequelize;


// akan dijalankan abis test selesai
afterAll( async (done) => {
    const deleteUser = await queryInterface.bulkDelete('Users');
    if (deleteUser) {
        console.log('Success delete');
        done()
    } else {
        console.log('Something wrong');
        done()
    }
})


describe('POST /register', () => {
    it('responds create new user', (done) => {
        request(app)
            .post('/register')
            .send({email: "admin@mail.com", password: "301197"})
            .then(resp => {
                expect(resp.status).toBe(201)
                expect(resp.body).toHaveProperty("id", expect.any(Number))
                expect(res.body).toHaveProperty("email", "admin@mail.com")
                done()
            })
            .catch(err=> {
                done()
            })
    })

    it('response invalid register', (done) => {
        request(app)
        .post('/register')
        .send({email: "admin@mail.com", password: "301197"})
        .then(resp => {
            expect(resp.status).toBe(500)
            expect(resp.body).toHaveProperty("message", "Email already exist")
            done()
        })
        .catch(err => {
            done()
        })
    })
})