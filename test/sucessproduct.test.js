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
    email : 'yulizarwidiatama@gmail.com',
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

describe ('CRUD product success',()=>{
  it('test create product',(done)=>{
    request(app)
    .post('/products/addproduct')
    .set('access_token', access_token)
    .send({name:'test product', image_url:'test url', price:10000, stock:100})
      .then(res =>{
        let {body,status} = res
        id = +res.body.id
        expect(status).toBe(201)
        expect(body).toHaveProperty('name',expect.any(String))
        expect(body).toHaveProperty('image_url',expect.any(String))
        expect(body).toHaveProperty('price',expect.any(Number))
        expect(body).toHaveProperty('stock',expect.any(Number))
        expect(body).toHaveProperty('UserId',expect.any(Number))
        done()
      })
      .catch(err=>{
        done(err)
      })
  })

  it('test read product',(done)=>{
    request(app)
    .get('/products')
    .then(res =>{
      let {body,status} = res
      expect(status).toBe(200)
      //cek key dalam array of object
      expect(body).toEqual(expect.arrayContaining([expect.objectContaining({name:expect.any(String)})]))
      expect(body).toEqual(expect.arrayContaining([expect.objectContaining({image_url:expect.any(String)})]))
      expect(body).toEqual(expect.arrayContaining([expect.objectContaining({price:expect.any(Number)})]))
      expect(body).toEqual(expect.arrayContaining([expect.objectContaining({stock:expect.any(Number)})]))
      expect(body).toEqual(expect.arrayContaining([expect.objectContaining({UserId:expect.any(Number)})]))
      done()
    })
    .catch(err=>{
      done(err)
    })
  })

  it('test update product',(done)=>{
    request(app)
    .put(`/products/${id}`)
    .set('access_token',access_token)
    .send({
      name:'tes update',
      image_url:'tes update',
      price:10000,
      stock:50
    })
      .then(res=>{
        let {body,status} = res
        expect(status).toBe(200)
        expect(body).toHaveProperty('name',expect.any(String))
        expect(body).toHaveProperty('image_url',expect.any(String))
        expect(body).toHaveProperty('price',expect.any(Number))
        expect(body).toHaveProperty('stock',expect.any(Number))
        expect(body).toHaveProperty('UserId',expect.any(Number))
        done()
      })
  })

  it('test delete product',(done)=>{
    request(app)
    .delete(`/products/${id}`)
    .set('access_token',access_token)
      .then(res=>{
        let {status} =res
        expect(status).toBe(200)
        done()
      })
      .catch(err=>{
        done(err)
      })
  })
})