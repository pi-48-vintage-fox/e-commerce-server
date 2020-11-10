const request = require('supertest')
const app = require('../app')
// const {sequelize} = require('../models')
// const {queryInterface} = sequelize

describe('POST /login', () => {
    it('Test login success', (done) => {
        request(app)
        .post('/login')
        .send({
            email: 'sample@gmail.com',
            password: 'sample123'
        })
        .then(response => {
            let { body, status } = response

            expect(status).toBe(200)
            expect(body).toHaveProperty('access_token', expect.any(String))  
            done()
        })
        .catch(err => {
            done()
        })
    })
})