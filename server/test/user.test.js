const request = require('supertest')
const app = require('../app')

describe('Test Endpoints POST /login',()=>{
    it('Test login success',(done)=>{
        request(app)
        .post('/user/login')
        .send({email:"admin@mail.com",password:'1234'})
        .then(response=>{
            let{body, status} = response
            expect(status).toEqual(200)
            expect(body).toHaveProperty('access_token', expect.any(String))
            expect(body).toHaveProperty('role', 'admin')
            done()
        })
        .catch(err => {
        done()
        })
    })
    it('Test invalid email/password',(done)=>{
        request(app)
        .post('/user/login')
        .send({email:"adminer@mail.com",password:'12345'})
        .then(response => {
            let {body, status} = response
            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'Wrong email or Password')
            done()
        })
        .catch(err => {
            done()
        })
    })
    it('Test invalid email',(done)=>{
        request(app)
        .post('/user/login')
        .send({email:"",password:'1234'})
        .then(response => {
            let {body, status} = response
            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'Wrong email or Password')
            done()
        })
        .catch(err => {
            done()
        })
    })
    it('Test invalid password',(done)=>{
        request(app)
        .post('/user/login')
        .send({email:"admin@mail.com",password:''})
        .then(response => {
            let {body, status} = response
            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'Wrong password')
            done()
        })
        .catch(err => {
            done()
        })
    })
})