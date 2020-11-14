const request = require('supertest')
const app = require('../app')
const {User} = require('../models/index')
const {SignToken} = require('../helpers/jwt')
const { sequelize } = require("../models/index");
const { queryInterface } = sequelize;

let access_token = ''

const tesUser = {
    email: "admin@mail.com",
    password: "1234",
}

let findById
let ProductId = {
    id: "",
    name: "compass low vintage",
    image_url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fsepatucompass.com%2Fproducts%2Fgazelle-low-vintage-black%2F&psig=AOvVaw1PCFkUGQ_Tge2SC66kDo97&ust=1605391235623000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKi_ssbCgO0CFQAAAAAdAAAAABAD",
    price: 270000,
    stock: 10,
};


beforeAll((done)=>{
    User.findOne({
        where:{
            email: tesUser.email
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

// afterAll((done) => {
//     queryInterface
//         .bulkDelete("Products")
//         .then(() => {
//             done();
//         })
//         .catch((err) => {
//             console.log(err);
//             done();
//         });
// });

//ADD
describe('Test Endpoints POST /product',()=>{
    it('Test create product success',(done)=>{
        request(app)
        .post('/product')
        .set("Accept", "application/json")
        .send({name:"compass high vintage",image_url:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tokopedia.com%2Fbarbers-1%2Fsepatu-compass-vintage-black-white-low-high&psig=AOvVaw3MCDN-UijXfQgp3rLxT8CN&ust=1605391166716000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJiYiKbCgO0CFQAAAAAdAAAAABAD',price:100000,stock:10})
        .set("access_token", access_token)
        .then(response=>{
            let{body, status} = response
            expect(status).toBe(201)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('name', 'compass high vintage')
            expect(body).toHaveProperty("image_url", expect.any(String));
            expect(body).toHaveProperty('price', 100000)
            expect(body).toHaveProperty('stock', 10)
            console.log(body,"dari bodyyyyyyyyyyyyyyyyyyy")
            findById = body.id
            console.log(findById)
            done()
        })
        .catch(err => {
        done(err)
        })
    })
    it('Test create product failed invalid access token',(done)=>{
        request(app)
        .post('/product')
        .set("Accept", "application/json")
        .send({name:"compass high vintage",image_url:'1.jpeg',price:100000,stock:10 })
        .set("access_token", "invalid")
        .then(response => {
            let {body, status} = response
            expect(status).toBe(401)
            expect(body).toHaveProperty("msg", "You are unauthorized")
            done()
        })
        .catch(err => {
            done(err)
        })
    })
    it('Test empty access token',(done)=>{
        request(app)
        .get('/product')
        .then(response=>{
            let{status} = response
            expect(status).toBe(401)
            done()
        })
        .catch(err => {
        done(err)
        })
    })
    it('Test create product failed wrong format image',(done)=>{
        request(app)
        .post('/product')
        .set("Accept", "application/json")
        .send({name:"compass high vintage",image_url:'gas',price:100000,stock:10 })
        .set("access_token", access_token)
        .then(response => {
            let {body, status} = response
            expect(status).toBe(401)
            expect(body).toHaveProperty("msg", "Image must be URL format")
            done()
        })
        .catch(err => {
            done(err)
        })
    })
    it('Test create product failed empty input',(done)=>{
        request(app)
        .post('/product')
        .set("Accept", "application/json")
        .send({name:"",image_url:'',price:'',stock:'' })
        .set("access_token", access_token)
        .then(response => {
            let {body, status} = response
            expect(status).toBe(401)
            done()
        })
        .catch(err => {
            done(err)
        })
    })
    it('Test create product failed minus input',(done)=>{
        request(app)
        .post('/product')
        .set("Accept", "application/json")
        .send({name:"compass high vintage",image_url:'1.jpeg',price:-1,stock:-1 })
        .set("access_token", access_token)
        .then(response => {
            let {body, status} = response
            expect(status).toBe(401)
            expect(body).toHaveProperty("msg", "Price must be more than 0")
            done()
        })
        .catch(err => {
            done(err)
        })
    })
})

//GET
describe('Test Endpoints GET /product',()=>{
    it('Test fetch product success',(done)=>{
        request(app)
        .get('/product')
        .set('access_token', access_token)
        .then(response=>{
            let{status} = response
            expect(status).toBe(200)
            done()
        })
        .catch(err => {
            done(err)
        })
    })
    it('Test empty access token',(done)=>{
        request(app)
        .get('/product')
        .then(response=>{
            let{status} = response
            expect(status).toBe(401)
            done()
        })
        .catch(err => {
        done(err)
        })
    })
    it('Test invalid token',(done)=>{
        request(app)
        .get('/product')
        .set('access_token', 'invalid')
        .then(response=>{
            let{status} = response
            expect(status).toBe(401)
            done()
        })
        .catch(err => {
        done(err)
        })
    })
})

//UPDATE
describe('Test Endpoints PUT /product',()=>{
    it('Test update product success',(done)=>{
        request(app)
        .put(`/product/${findById}`)
        .set("Accept", "application/json")
        .send({name:"compass high vintage",image_url:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tokopedia.com%2Fbarbers-1%2Fsepatu-compass-vintage-black-white-low-high&psig=AOvVaw3MCDN-UijXfQgp3rLxT8CN&ust=1605391166716000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJiYiKbCgO0CFQAAAAAdAAAAABAD',price:100000,stock:10})
        .set('access_token', access_token)
        .then(response=>{
            let{body, status} = response
            expect(status).toBe(200)
            expect(body).toHaveProperty('message','Updated Success')
            done()
        })
        .catch(err => {
            done(err)
        })
    })
    it('Test empty access token',(done)=>{
        request(app)
        .put(`/product/${findById}`)
        .then(response=>{
            let{status} = response
            expect(status).toBe(401)
            done()
        })
        .catch(err => {
        done(err)
        })
    })
    it('Test invalid token',(done)=>{
        request(app)
        .put(`/product/${findById}`)
        .set('access_token', 'invalid')
        .then(response=>{
            let{status} = response
            expect(status).toBe(401)
            done()
        })
        .catch(err => {
        done(err)
        })
    })
    it('Test update product failed wrong format image',(done)=>{
        request(app)
        .put(`/product/${findById}`)
        .set("Accept", "application/json")
        .send({name:"compass high vintage",image_url:'gas',price:100000,stock:10 })
        .set("access_token", access_token)
        .then(response => {
            let {body, status} = response
            expect(status).toBe(401)
            expect(body).toHaveProperty("msg", "Image must be URL format")
            done()
        })
        .catch(err => {
            done(err)
        })
    })
    it('Test update product failed empty input',(done)=>{
        request(app)
        .put(`/product/${findById}`)
        .set("Accept", "application/json")
        .send({name:"",image_url:'',price:'',stock:'' })
        .set("access_token", access_token)
        .then(response => {
            let {body, status} = response
            expect(status).toBe(401)
            done()
        })
        .catch(err => {
            done(err)
        })
    })
    it('Test update product failed minus input',(done)=>{
        request(app)
        .put(`/product/${findById}`)
        .set("Accept", "application/json")
        .send({name:"compass high vintage",image_url:'1.jpeg',price:-1,stock:-1 })
        .set("access_token", access_token)
        .then(response => {
            let {body, status} = response
            expect(status).toBe(401)
            expect(body).toHaveProperty("msg", "Price must be more than 0")
            done()
        })
        .catch(err => {
            done(err)
        })
    })
})

//DELETE
describe('Test Endpoints DELETE /product',()=>{
    it('Test delete success',(done)=>{
        request(app)
        .delete(`/product/${findById}`)
        .set("Accept", "application/json")
        .set('access_token', access_token)
        .then(response=>{
            let{status, body} = response
            expect(status).toBe(200)
            expect(body).toHaveProperty("message", "Deleted Success");
            done()
        })
        .catch(err => {
            done(err)
        })
    })
    it('Test empty access token',(done)=>{
        request(app)
        .delete(`/delete/${findById}`)
        .then(response=>{
            let{status} = response
            expect(status).toEqual(404)
            done()
        })
        .catch(err => {
        done(err)
        })
    })
    it('Test invalid token',(done)=>{
        request(app)
        .delete(`/delete/${findById}`)
        .set('access_token', 'invalid')
        .then(response=>{
            let{status} = response
            expect(status).toEqual(404)
            done()
        })
        .catch(err => {
        done(err)
        })
    })
})