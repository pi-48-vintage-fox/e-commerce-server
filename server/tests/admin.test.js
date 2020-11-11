const request = require('supertest')
const app = require('../app')

describe('Test Endpoint POST /admin/login', () => {
    it('Test login sucess', (done) => {
        request(app)
        .post('/admin/login')
        .send({email: 'admin@mail.com', password: '123456'})
        .then(response => {
            let {body, status} = response
            expect(status).toEqual(200)
            expect(body).toHaveProperty('access_token', expect.any(String))
            done()
        })
        .catch(err => {
            console.log(err)
            done()
        })
    })

    it('Test login wrong password', (done) => {
        request(app)
        .post('/admin/login')
        .send({email: 'admin@mail.com', password: '12345667788'})
        .then(response => {
            let {body, status} = response
            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'Wrong email/password')
            done()
        })
        .catch(err => {
            console.log(err)
            done()
        })
    })

    it('Test login wrong email', (done) => {
        request(app)
        .post('/admin/login')
        .send({email: 'admin12345@mail.com', password: '123456'})
        .then(response => {
            let {body, status} = response
            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'Wrong email/password')
            done()
        })
        .catch(err => {
            console.log(err)
            done()
        })
    })

    it('Test login no email and password', (done) => {
        request(app)
        .post('/admin/login')
        .send({email: '', password: ''})
        .then(response => {
            let {body, status} = response
            expect(status).toEqual(400)
            expect(body).toHaveProperty('msg', 'Wrong email/password')
            done()
        })
        .catch(err => {
            console.log(err)
            done()
        })
    })
})