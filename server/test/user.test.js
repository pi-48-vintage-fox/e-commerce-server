const request = require('supertest')
const app = require('../app')


describe('TestLogin Post/login' ,() => {
    it('login success', (done) => {
      request(app)
      .post('/login')
      .send({ email: 'admin@mail.com', password: '123456'})
      .then(response => {
        
        //console.log(response);
        
        const { body, status } = response
        
        expect(status).toEqual(200)
        expect(body).toHaveProperty('access_token', expect.any(String))
        expect(body).toHaveProperty('username', 'admin')
        done()     
      })
      .catch(err => {
        done(err)
      })
    })
    it('login failed wrong email', (done) => {
      request(app)
      .post('/login')
      .send({email: 'coba@mail.com', password: '1234'})
      .then(response => {
        const { body, status } = response
        //console.log(body);
        
        expect(status).toEqual(401)
        expect(body).toHaveProperty('msg', 'invalid email or password')
        done()
      })
      .catch(err => {
        //console.log(err);
        done(err)
        
      })
    })
    it('login failed wrong password', (done) => {
      request(app)
      .post('/login')
      .send({email: 'admin@mail.com', password: '12345690'})
      .then(response => {
        const { body, status } = response
        //console.log(body);
        
        expect(status).toEqual(401)
        expect(body).toHaveProperty('msg', 'invalid email or password')
        done()
      })
      .catch(err => {
        //console.log(err);
        done(err)  
      })
    })
    it('login failed empty email, empty password', (done) => {
      request(app)
      .post('/login')
      .send({email: '', password: ''})
      .then(response => {
        const { body, status } = response
        expect(status).toEqual(400)
        expect(body).toHaveProperty('msg','you should input something to the field')
        done()
      })
      .catch(err => {
        done(err)
      })
    })
})

