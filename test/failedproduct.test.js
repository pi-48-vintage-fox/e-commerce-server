const request = require('supertest')
const app = require('../app')

const {User} = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const{sequelize} = require('../models')
const {queryInterface} = sequelize

let access_token
let id

beforeAll((done) => {
  let params = {
    email : 'yulizarwidiatama1@gmail.com',
    password: 'Tiramisu12'
  }
  User.findOne({where:{email:params.email}})
  .then(loginUser=>{
    if(loginUser && bcrypt.compareSync(params.password,loginUser.password)){
      access_token = jwt.sign({id:loginUser.id, email:loginUser.email, role:loginUser.role}, process.env.SECRET)
    }
    done()
  })
  .catch(err=>{
    console.log(err)
  })
});

afterAll(done=>{
  queryInterface.bulkDelete('Products')
    .then(()=>{
      done()
    })
    .catch(err=>{
      done(err)
    })
})

describe ('Test endpoint post /products/addproduct', ()=>{
  it('Not Have Access Token', (done)=>{
    request(app)
    .post('/products/addproduct')
    .send({name:'Test Product 1', image_url:'test link', price:1000, stock:100})
      .then(res=>{
        let {status, body}= res
        expect(status).toBe(401)
        done()
      })
      .catch(err=>{
        done(err)
      })
  })

  it('Have Access Token, not admin',(done)=>{
    request(app)
    .post('/products/addproduct')
    .set('access_token', access_token)
    .send({name:'test product', image_url:'test url', price:10000, stock:100})
      .then(res =>{
        let {body,status} = res
        id = +res.body.id
        expect(status).toBe(400)
        expect(body).toHaveProperty('msg',expect.any(String))
        
        done()
      })
      .catch(err=>{
        done(err)
      })
  })

  it('Required Field Not Fully Completed', (done)=>{
    request(app)
    .post('/products/addproduct')
    .set('access_token', access_token)
    .send({name:'', image_url:'', price:'', stock:''})
      .then(res =>{
        let {body,status} = res
        id = +res.body.id
        expect(status).toBe(400)
        expect(body).toHaveProperty('msg',expect.any(String))
        
        done()
      })
      .catch(err=>{
        done(err)
      })
  })

  it('Stock Negative', (done)=>{
    request(app)
    .post('/products/addproduct')
    .set('access_token', access_token)
    .send({name:'test product', image_url:'test url', price:10000, stock:-2})
      .then(res =>{
        let {body,status} = res
        id = +res.body.id
        expect(status).toBe(400)
        expect(body).toHaveProperty('msg',expect.any(String))
        
        done()
      })
      .catch(err=>{
        done(err)
      })
  })

  it('Price Negative',(done)=>{
    request(app)
    .post('/products/addproduct')
    .set('access_token', access_token)
    .send({name:'test product', image_url:'test url', price:-10000, stock:100})
      .then(res =>{
        let {body,status} = res
        id = +res.body.id
        expect(status).toBe(400)
        expect(body).toHaveProperty('msg',expect.any(String))
        
        done()
      })
      .catch(err=>{
        done(err)
      })
  })

  it('Wrong Datatypes',(done)=>{
    request(app)
    .post('/products/addproduct')
    .set('access_token', access_token)
    .send({name:'test product', image_url:'test url', price:'10000', stock:'100'})
      .then(res =>{
        let {body,status} = res
        id = +res.body.id
        expect(status).toBe(400)
        expect(body).toHaveProperty('msg',expect.any(String))
        
        done()
      })
      .catch(err=>{
        done(err)
      })
  })
})