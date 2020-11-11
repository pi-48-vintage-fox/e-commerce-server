const request = require('supertest')
const app = require('../app')


describe('POST /login', () => {
    // SUCCESS========================================================================
    it('Test login sukses', (done) => {
        request(app)
        .post('/login')
        .send({
            email: 'sample@gmail.com',
            password: 'sample123',
        })
        .then(response => {
            let { body, status } = response

            expect(status).toEqual(200)
            expect(body).toHaveProperty('access_token', expect.any(String))
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('email', 'sample@gmail.com')  
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    // FAILED========================================================================
    it('Test email ada, password salah', (done) => {
        request(app)
        .post('/login')
        .send({
            email: 'sample@gmail.com',
            password: 'spontanuhuy'
        })
        .then(response => {
            let { body, status } = response

            expect(status).toBe(401)
            expect(body).toHaveProperty('message', 'Wrong email or password')  
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('Test email tidak ada di db', (done) => {
        request(app)
        .post('/login')
        .send({
            email: 'spontan@mail.com',
            password: 'spontanuhuy'
        })
        .then(response => {
            let { body, status } = response

            expect(status).toBe(401)
            expect(body).toHaveProperty('message', 'Wrong email or password')  
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('Test tidak memasukkan email dan password', (done) => {
        request(app)
        .post('/login')
        .send({
            email: '',
            password: ''
        })
        .then(response => {
            let { body, status } = response

            expect(status).toBe(401)
            expect(body).toHaveProperty('message', 'Wrong email or password')  
            done()
        })
        .catch(err => {
            done(err)
        })
    })
})