const request = require('supertest')
const app = require('../app')
const bcrypt = require('bcryptjs')

describe('Test Endpoint POST /users/login', ()=>{
  it ('test login success', (done)=>{
    request(app)
    .post('/users/login')
    .send({email:'yulizarwidiatama@gmail.com', password:'Tiramisu12'})
    .then(res =>{
      let {body,status} = res
      expect(status).toBe(200)
      expect(body).toHaveProperty('access_token',expect.any(String))
      expect(body).toHaveProperty('name',expect.any(String))
      expect(body).toHaveProperty('role',expect.any(String))
      done()
    })
    .catch(err=>{
      console.log(err)
      done()
    })
  })

  it ('test login, have email but wrong password', (done)=>{
    request(app)
    .post('/users/login')
    .send({email:'yulizarwidiatama@gmail.com', password:'Tiramisu12'})
    .then(res=>{
      let {body, status} = res
      expect(status).toBe(400)
      expect(body).toHaveProperty("msg","Password / Email are wrong")
      done()
    })
    .catch(err=>{
      console.log(err)
      done()
    })
  })

  it ('test login, email not exists',(done)=>{
    request(app)
    .post('/users/login')
    .send({email:'yulizar@gmail.com', password:'Tiramisu12'})
    .then(res=>{
      let {body,status} = res
      expect(status).toBe(400)
      expect(body).toHaveProperty("msg","Password / Email are wrong")
      done()
    })
    .catch(err=>{
      console.log(err)
      done()
    })
  })

  it('test login, email and password not inputted',(done)=>{
    request (app)
    .post('/users/login')
    .send({email:'',password:''})
    .then(res=>{
      let {body,status} = res
      expect(status).toBe(400)
      expect(body).toHaveProperty("msg","Password / Email are wrong")
      done()
    })
    .catch(err=>{
      done(err)
    })
  })
})