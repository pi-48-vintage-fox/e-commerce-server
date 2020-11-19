const request = require('supertest')
const app = require('../app.js')

describe('login test', () => {
    test('Successfully Login', (done) => {
        const user = {
            email: 'admin@mail.com',
            password: '123456',
        }
        request(app)
            .post('/login')
            .send(user)
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response
                expect(status).toBe(200)
                expect(body).toHaveProperty('access_token', expect.any(String))
                done()
            })
    })

    test('wrong email', (done) => {
        const user = {
            email: 'xxx@mail.com',
            password: '123456'
        }
        request(app)
            .post('/login')
            .send(user)
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', "Email/password is wrong.")
                done()
            })
    })
    test('wrong password', (done) => {
        const user = {
            email: 'admin@mail.com',
            password: 'xxxx'
        }
        request(app)
            .post('/login')
            .send(user)
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', "Email/password is wrong.")
                done()
            })
    })
    test('empty email/password', (done) => {
        const user = {
            email: '',
            password: ''
        }
        request(app)
            .post('/login')
            .send(user)
            .set('accept', 'application/json')
            .then(response => {
                const { status, body } = response
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', "Email and password must be filled.")
                done()
            })
    })
})