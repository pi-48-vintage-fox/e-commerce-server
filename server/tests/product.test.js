const request = require("supertest")
const app = require("../app")
const {User} = require("../models/")
const jwt = require("../helpers/jwt")
let access_token = ''
let access_token_customer = ''
let id = 0

beforeAll((done) => {
    User.findOne({
      where: {
        email: 'admin@admin.com'
      }
    })
    .then(user => {
        access_token = jwt.signToken({
            id: user.id,
            email: user.email,
            role:user.role
        })

        return User.findOne({where:{
            email: 'customer@customer.com'
        }})
    })
    .then(cust =>{
        access_token_customer = jwt.signToken({
            id: cust.id,
            email: cust.email,
            role:cust.role
        })
        done()
    })
    .catch(err=>{
        done(err)
    })
})

describe('Test endpoints POST /products',()=>{
    it('test berhasil add product',(done)=>{
        request(app)
        .post('/products')
        .set('access_token',access_token)
        .send({
            name: "Keripik Singkong",
            image_url: "https://cdns.klimg.com/merdeka.com/i/w/news/2020/03/11/1155013/540x270/6-resep-membuat-keripik-singkong-renyah-cemilan-bikin-nagih.jpg",
            price: 30000,
            stock: 10
        })
        .then(response=>{
            const {body,status} = response
            id = body.id
            expect(status).toEqual(201)
            expect(body).toHaveProperty('id',expect.any(Number))
            expect(body).toHaveProperty('name','Keripik Singkong')
            expect(body).toHaveProperty('image_url','https://cdns.klimg.com/merdeka.com/i/w/news/2020/03/11/1155013/540x270/6-resep-membuat-keripik-singkong-renyah-cemilan-bikin-nagih.jpg')
            expect(body).toHaveProperty('price',30000)
            expect(body).toHaveProperty('stock',10)
            done()
        })
        .catch(err=>{
            console.log(err,'<<ini error');
            done(err)
        })
    })
    it('test failed access token',(done)=>{
        request(app)
        .post('/products')
        .send({
            name: "Keripik Singkong",
            image_url: "https://cdns.klimg.com/merdeka.com/i/w/news/2020/03/11/1155013/540x270/6-resep-membuat-keripik-singkong-renyah-cemilan-bikin-nagih.jpg",
            price: 30000,
            stock: 10
        })
        .then(response=>{
            const {body,status} = response
            expect(status).toEqual(403)
            expect(body).toHaveProperty('msg','You dont have access')
            done()
        })
        .catch(err=>{
            console.log(err);
            done(err)
        })
    })
    it('test field tidak diisi',(done)=>{
        request(app)
        .post('/products')
        .set('access_token',access_token)
        .send({
            name: "",
            image_url: "",
            price: 30000,
            stock: 10
        })
        .then(response=>{
            const {body,status} = response
            expect(status).toEqual(400)
            expect(body).toHaveProperty('msg','Please fill all form')
            done()
        })
        .catch(err=>{
            console.log(err);
            done(err)
        })
    })
    it('test stock diisi angka minus',(done)=>{
        request(app)
        .post('/products')
        .set('access_token',access_token)
        .send({
            name: "Keripik Singkong",
            image_url: "https://cdns.klimg.com/merdeka.com/i/w/news/2020/03/11/1155013/540x270/6-resep-membuat-keripik-singkong-renyah-cemilan-bikin-nagih.jpg",
            price: 30000,
            stock: -10
        })
        .then(response=>{
            const {body,status} = response
            expect(status).toEqual(400)
            expect(body).toHaveProperty('msg','Stock cannot be negative value')
            done()
        })
        .catch(err=>{
            console.log(err);
            done(err)
        })
    })
    it('test price diisi angka minus',(done)=>{
        request(app)
        .post('/products')
        .set('access_token',access_token)
        .send({
            name: "Keripik Singkong",
            image_url: "https://cdns.klimg.com/merdeka.com/i/w/news/2020/03/11/1155013/540x270/6-resep-membuat-keripik-singkong-renyah-cemilan-bikin-nagih.jpg",
            price: -30000,
            stock: 10
        })
        .then(response=>{
            const {body,status} = response
            expect(status).toEqual(400)
            expect(body).toHaveProperty('msg','Price cannot be negative value')
            done()
        })
        .catch(err=>{
            console.log(err);
            done(err)
        })
    })
    it('test type data stock tidak sesuai',(done)=>{
        request(app)
        .post('/products')
        .set('access_token',access_token)
        .send({
            name: "Keripik Singkong",
            image_url: "https://cdns.klimg.com/merdeka.com/i/w/news/2020/03/11/1155013/540x270/6-resep-membuat-keripik-singkong-renyah-cemilan-bikin-nagih.jpg",
            price: 30000,
            stock: "stock"
        })
        .then(response=>{
            const {body,status} = response
            expect(status).toEqual(400)
            expect(body).toHaveProperty('msg','Stock must be a number')
            done()
        })
        .catch(err=>{
            console.log(err);
            done(err)
        })
    })
    it('test type data price tidak sesuai',(done)=>{
        request(app)
        .post('/products')
        .set('access_token',access_token)
        .send({
            name: "Keripik Singkong",
            image_url: "https://cdns.klimg.com/merdeka.com/i/w/news/2020/03/11/1155013/540x270/6-resep-membuat-keripik-singkong-renyah-cemilan-bikin-nagih.jpg",
            price: "harga",
            stock: 10
        })
        .then(response=>{
            const {body,status} = response
            expect(status).toEqual(400)
            expect(body).toHaveProperty('msg','Price must be a number')
            done()
        })
        .catch(err=>{
            console.log(err);
            done(err)
        })
    })
    it('test access token bukan admin',(done)=>{
        request(app)
        .post('/products')
        .set('access_token',access_token_customer)
        .send({
            name: "Keripik Singkong",
            image_url: "https://cdns.klimg.com/merdeka.com/i/w/news/2020/03/11/1155013/540x270/6-resep-membuat-keripik-singkong-renyah-cemilan-bikin-nagih.jpg",
            price: 30000,
            stock: 10
        })
        .then(response=>{
            const {body,status} = response
            expect(status).toEqual(403)
            expect(body).toHaveProperty('msg','You dont have access')
            done()
        })
        .catch(err=>{
            console.log(err);
            done(err)
        })
    })
})

describe('Test endpoints PUT /products/:id',()=>{
    it('test berhasil edit product',(done)=>{
        request(app)
        .put(`/products/${id}`)
        .set('access_token',access_token)
        .send({
            name: "Keripik Singkong Edit",
            image_url: "https://cdns.klimg.com/merdeka.com/i/w/news/2020/03/11/1155013/540x270/6-resep-membuat-keripik-singkong-renyah-cemilan-bikin-nagih.jpg",
            price: 40000,
            stock: 9
        })
        .then(response=>{
            const {body,status} = response
            expect(status).toEqual(200)
            expect(body).toHaveProperty('id',expect.any(Number))
            expect(body).toHaveProperty('name','Keripik Singkong Edit')
            expect(body).toHaveProperty('image_url','https://cdns.klimg.com/merdeka.com/i/w/news/2020/03/11/1155013/540x270/6-resep-membuat-keripik-singkong-renyah-cemilan-bikin-nagih.jpg')
            expect(body).toHaveProperty('price',40000)
            expect(body).toHaveProperty('stock',9)
            done()
        })
        .catch(err=>{
            console.log(err,'<<ini error');
            done(err)
        })
    })
    it('test failed access token',(done)=>{
        request(app)
        .put(`/products/${id}`)
        .send({
            name: "Keripik Singkong Edit",
            image_url: "https://cdns.klimg.com/merdeka.com/i/w/news/2020/03/11/1155013/540x270/6-resep-membuat-keripik-singkong-renyah-cemilan-bikin-nagih.jpg",
            price: 40000,
            stock: 9
        })
        .then(response=>{
            const {body,status} = response
            expect(status).toEqual(403)
            expect(body).toHaveProperty('msg','You dont have access')
            done()
        })
        .catch(err=>{
            console.log(err);
            done(err)
        })
    })
    it('test field tidak diisi',(done)=>{
        request(app)
        .put(`/products/${id}`)
        .set('access_token',access_token)
        .send({
            name: "",
            image_url: "",
            price: 40000,
            stock: 9
        })
        .then(response=>{
            const {body,status} = response
            expect(status).toEqual(400)
            expect(body).toHaveProperty('msg','Please fill all form')
            done()
        })
        .catch(err=>{
            console.log(err);
            done(err)
        })
    })
    it('test stock diisi angka minus',(done)=>{
        request(app)
        .put(`/products/${id}`)
        .set('access_token',access_token)
        .send({
            name: "Keripik Singkong Edit",
            image_url: "https://cdns.klimg.com/merdeka.com/i/w/news/2020/03/11/1155013/540x270/6-resep-membuat-keripik-singkong-renyah-cemilan-bikin-nagih.jpg",
            price: 40000,
            stock: -9
        })
        .then(response=>{
            const {body,status} = response
            expect(status).toEqual(400)
            expect(body).toHaveProperty('msg','Stock cannot be negative value')
            done()
        })
        .catch(err=>{
            console.log(err);
            done(err)
        })
    })
    it('test price diisi angka minus',(done)=>{
        request(app)
        .put(`/products/${id}`)
        .set('access_token',access_token)
        .send({
            name: "Keripik Singkong Edit",
            image_url: "https://cdns.klimg.com/merdeka.com/i/w/news/2020/03/11/1155013/540x270/6-resep-membuat-keripik-singkong-renyah-cemilan-bikin-nagih.jpg",
            price: -40000,
            stock: 9
        })
        .then(response=>{
            const {body,status} = response
            expect(status).toEqual(400)
            expect(body).toHaveProperty('msg','Price cannot be negative value')
            done()
        })
        .catch(err=>{
            console.log(err);
            done(err)
        })
    })
    it('test type data stock tidak sesuai',(done)=>{
        request(app)
        .put(`/products/${id}`)
        .set('access_token',access_token)
        .send({
            name: "Keripik Singkong Edit",
            image_url: "https://cdns.klimg.com/merdeka.com/i/w/news/2020/03/11/1155013/540x270/6-resep-membuat-keripik-singkong-renyah-cemilan-bikin-nagih.jpg",
            price: 40000,
            stock: "stock"
        })
        .then(response=>{
            const {body,status} = response
            expect(status).toEqual(400)
            expect(body).toHaveProperty('msg','Stock must be a number')
            done()
        })
        .catch(err=>{
            console.log(err);
            done(err)
        })
    })
    it('test type data price tidak sesuai',(done)=>{
        request(app)
        .put(`/products/${id}`)
        .set('access_token',access_token)
        .send({
            name: "Keripik Singkong Edit",
            image_url: "https://cdns.klimg.com/merdeka.com/i/w/news/2020/03/11/1155013/540x270/6-resep-membuat-keripik-singkong-renyah-cemilan-bikin-nagih.jpg",
            price: "harga",
            stock: 9
        })
        .then(response=>{
            const {body,status} = response
            expect(status).toEqual(400)
            expect(body).toHaveProperty('msg','Price must be a number')
            done()
        })
        .catch(err=>{
            console.log(err);
            done(err)
        })
    })
    it('test not found',(done)=>{
        request(app)
        .put(`/products/${id+100}`)
        .set('access_token',access_token)
        .send({
            name: "Keripik Singkong Edit",
            image_url: "https://cdns.klimg.com/merdeka.com/i/w/news/2020/03/11/1155013/540x270/6-resep-membuat-keripik-singkong-renyah-cemilan-bikin-nagih.jpg",
            price: 40000,
            stock: 9
        })
        .then(response=>{
            const {body,status} = response
            expect(status).toEqual(404)
            expect(body).toHaveProperty('msg','Data Not Found')
            done()
        })
        .catch(err=>{
            console.log(err,'<<ini error');
            done(err)
        })
    })
    it('test access token bukan admin',(done)=>{
        request(app)
        .put(`/products/${id}`)
        .set('access_token',access_token_customer)
        .send({
            name: "Keripik Singkong Edit",
            image_url: "https://cdns.klimg.com/merdeka.com/i/w/news/2020/03/11/1155013/540x270/6-resep-membuat-keripik-singkong-renyah-cemilan-bikin-nagih.jpg",
            price: 40000,
            stock: 9
        })
        .then(response=>{
            const {body,status} = response
            expect(status).toEqual(403)
            expect(body).toHaveProperty('msg','You dont have access')
            done()
        })
        .catch(err=>{
            console.log(err);
            done(err)
        })
    })
})

describe('Test endpoints DELETE /products/:id',()=>{
    it('test delete not found',(done)=>{
        request(app)
        .delete(`/products/${id+100}`)
        .set('access_token',access_token)
        .then(response=>{
            const {body,status} = response
            expect(status).toEqual(404)
            expect(body).toHaveProperty('msg','Data Not Found')
            done()
        })
        .catch(err=>{
            console.log(err);
            done(err)
        })
    })
    it('test menyertakan access token bukan admin',(done)=>{
        request(app)
        .delete(`/products/${id}`)
        .set('access_token',access_token_customer)
        .then(response=>{
            const {body,status} = response
            expect(status).toEqual(403)
            expect(body).toHaveProperty('msg','You dont have access')
            done()
        })
        .catch(err=>{
            console.log(err);
            done(err)
        })
    })
    it('test tidak menyertakan access token',(done)=>{
        request(app)
        .delete(`/products/${id}`)
        .then(response=>{
            const {body,status} = response
            expect(status).toEqual(403)
            expect(body).toHaveProperty('msg','You dont have access')
            done()
        })
        .catch(err=>{
            console.log(err);
            done(err)
        })
    })
    it('test delete berhasil',(done)=>{
        request(app)
        .delete(`/products/${id}`)
        .set('access_token',access_token)
        .then(response=>{
            const {body,status} = response
            expect(status).toEqual(200)
            expect(body).toHaveProperty('msg','Product Deleted')
            done()
        })
        .catch(err=>{
            console.log(err);
            done(err)
        })
    })
})