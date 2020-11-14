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

let access_token;
let userLogin;

describe('POST /register', () => {
    it('response create new user', (done) => {
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
});

describe('POST/ login', () => {
    it('response success login', (done) => {
        request(app)
         .post('/login')
         .send({email: "admin@mail.com", password: "301197"})
         .then(resp => {
            expect(resp.status).toBe(200);
            access_token = resp.body;
            expect(resp.body).toHaveProperty('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJpYXQiOjE2MDUwMjEwMDl9.rKPG5lI3koAFsTwcfDKAOvxJGmYt5W6K8E3IKQhgJI8')
            // console.log(resp.body);
            done()
         })
         .catch(err => {
            done()
        })
    });

    it('response failed login', (done) => {
        request(app)
         .post('/login')
         .send({email: "user@mail.com", password: "123456"})
         .then(resp => {
            console.log(resp, 'resp 1');
            userLogin = resp.body;
            // expect(resp.status).toBe(401);
            // expect(resp.body).toHaveProperty("email", "admin@mail.com")
            // expect(resp.body).toHaveProperty("password", "301197")
            return verify(access_token)
         })
         .then(resp => {
            // console.log(resp.email, 'decoded token');
            expect(resp.status).toBe(401);
            expect(userLogin).toHaveProperty("email", resp.email);
            expect(resp.body).toHaveProperty("message", "Email or Password wrong")
            done()
         })
         .catch(err => {
            done()
        })
    })
})