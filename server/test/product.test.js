const request = require('supertest')
const app = require('../app')
const {SignToken} = require('../helpers/jwt')
const {User} = require('../models/index')

let access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTYwNTExMTgyMn0.jKN1Do6TdbnYYWVsBkTIIO2psqxZR266u8H-DuX406Q'
let invalid_access_token 
let id

beforeAll((done)=>{
    User.findOne({
        where:{
            email:'admin@mail.com'
        }
    })
    .then(res =>{
        access_token = SignToken({
            id:res.id,
            email:res.email,
            role:res.role
        })
        done()
    })
    .catch(err =>{
        done(err)
    })
})

describe('Test Endpoints POST /product',()=>{
    it('Test product success',(done)=>{
        request(app)
        .post('/product')
        .send({name:"compass high vintage",image_url:'1.jpeg',price:'100000',stock:'10'})
        .then(response=>{
            let{body, status} = response
            expect(status).toEqual(200)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('name', 'compass high vintage')
            expect(body).toHaveProperty('image_url', '`.jpeg`')
            expect(body).toHaveProperty('price', 100000)
            expect(body).toHaveProperty('stock', 10)
            done()
        })
        .catch(err => {
        done(err)
        })
    })
    it('Test invalid email/password',(done)=>{
        request(app)
        .post('/product')
        .send({name:"compass high vintage",image_url:'1.jpeg',price:'100000',stock:'10'})
        .then(response => {
            let {body, status} = response
            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'name must filled')
            done()
        })
        .catch(err => {
            done(err)
        })
    })
})


describe('Test Endpoints GET /product',()=>{
    it('Test fetch product success',(done)=>{
        request(app)
        .get('/product')
        .set('access_token', access_token)
        .then(response=>{
            let{status} = response
            expect(status).toEqual(200)
            done()
        })
        .catch(err => {
            done(err)
        })
    })
    it('Test invalid fetch product',(done)=>{
        request(app)
        .get('/product')
        .set('access_token', invalid_access_token)
        .then(response=>{
            let{status} = response
            expect(status).toEqual(200)
            done()
        })
        .catch(err => {
        done(err)
        })
    })
})