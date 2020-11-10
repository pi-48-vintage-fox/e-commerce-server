const request = require('supertest')
const app = require('../app')
const { User } = require('../models')
const { generateToken } = require('../helpers/jsonwebtoken')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
let access_token = ''
let idProduct
let role 


beforeAll((done) => {
  
  User.findOne({
    where: {
      email: 'admin@mail.com'
    }
  })
    .then(user => {
    role = user.role
     access_token = generateToken({
        id: user.id,
        email: user.email,        
      })
      done()
    })
    .catch(err => {
      done(err)
    })

})

afterAll((done) => {

  queryInterface.bulkDelete('Products')
    .then(() => {
      done()
    })
    .catch(err => {
      //console.log(err);
      done(err)
    })

})
describe('test add product', () => {
  it('add product sukses', (done) => {
    request(app)
    .post('/products')
    .set('access_token', access_token)
    .send({name: 'sweater gakUnik', 
          image_url: 'https://d15udtvdbbfasl.cloudfront.net/catalog/product/large_image/69_412960.jpg',
          price: 100000, 
          stock: 100})
    .then(response => {
      const { body, status } = response
      idProduct = body.id
      expect(status).toEqual(201)
      expect(body).toHaveProperty('id', expect.any(Number))
      expect(body).toHaveProperty('name', 'sweater gakUnik')
      expect(body).toHaveProperty('image_url', 'https://d15udtvdbbfasl.cloudfront.net/catalog/product/large_image/69_412960.jpg')
      expect(body).toHaveProperty('price', 100000)
      expect(body).toHaveProperty('stock', 100 )
      done()
    })
    .catch(err => {
      //console.log(err, 'ini di add product test');
      done(err)
    })
  })
  it('add product failed dont have token', (done) => {
      request(app)
      .post('/products')
      .send({ name: 'sweater gakUnik', 
              image_url: 'https://d15udtvdbbfasl.cloudfront.net/catalog/product/large_image/69_412960.jpg',
              price: 100000, 
              stock: 100})
      .then(response => {
        const { body, status } = response
       
        expect(status).toEqual(401)
        expect(body).toHaveProperty('msg', `You have to login first`)
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it('add product failed one of required field is empty', (done) => {
    request(app)
    .post('/products')
    .set('access_token', access_token)
    .send({name: 'sweater gakUnik', 
          image_url: 'https://d15udtvdbbfasl.cloudfront.net/catalog/product/large_image/69_412960.jpg',
          price: '', 
          stock: 100})
    .then(response => {
      const { body, status } = response
      
      expect(status).toEqual(400)
      expect(body).toHaveProperty('msg', 'please fill in the field')
      done()
    })
    .catch(err => {
      //console.log(err, 'ini di add product test');
      done(err)
    })
  })
  it('add product failed one of stock or price less than 0', (done) => {
    request(app)
    .post('/products')
    .set('access_token', access_token)
    .send({name: 'sweater gakUnik', 
          image_url: 'https://d15udtvdbbfasl.cloudfront.net/catalog/product/large_image/69_412960.jpg',
          price: -10, 
          stock: 100})
    .then(response => {
      const { body, status } = response
      
      expect(status).toEqual(400)
      expect(body).toHaveProperty('msg', 'price or stock must greater than 0')
      done()
    })
    .catch(err => {
      //console.log(err, 'ini di add product test');
      done(err)
    })
  })
  it('add product failed one of stock or price string', (done) => {
    request(app)
    .post('/products')
    .set('access_token', access_token)
    .send({name: 'sweater gakUnik', 
          image_url: 'https://d15udtvdbbfasl.cloudfront.net/catalog/product/large_image/69_412960.jpg',
          price: "'100000'", 
          stock: 100})
    .then(response => {
      const { body, status } = response
      
      expect(status).toEqual(400)
      expect(body).toHaveProperty('msg', 'price or stock must be number')
      done()
    })
    .catch(err => {
      //console.log(err, 'ini di add product test');
      done(err)
    })
  })
})

describe("test show all Product", () => {

  it('show products sukses', (done) => {
    request(app)
    .get('/products')
    .set('access_token', access_token)
    .then(response => {

      const { body, status } = response
      //console.log(body);
      
      expect(status).toEqual(200)
      body.products.forEach(el => {
        expect(el).toHaveProperty('name', 'sweater gakUnik' )
        expect(el).toHaveProperty('image_url', 'https://d15udtvdbbfasl.cloudfront.net/catalog/product/large_image/69_412960.jpg')
        expect(el).toHaveProperty('price', 100000)
        expect(el).toHaveProperty('stock', 100 )
      })
      done()
    })
    .catch(err => {
      //console.log(err);
      done(err)
    })
  })
})

describe("test showProduct by id", () => {
  it('show one product sukses', (done) => {
    request(app)
    .get('/products/' + idProduct)
    .set('access_token', access_token)
    .then(response => {

       const { body, status } = response
          expect(status).toEqual(200)
          expect(body).toHaveProperty('name', 'sweater gakUnik' )
          expect(body).toHaveProperty('image_url', 'https://d15udtvdbbfasl.cloudfront.net/catalog/product/large_image/69_412960.jpg')
          expect(body).toHaveProperty('price', 100000)
          expect(body).toHaveProperty('stock', 100 )

          done()
    })
    .catch(err => {
      //console.log(err);
      done(err)
    })
    
  })
})

describe("test editProduct" ,() => {
  it('update data product sukses', (done) => {
    request(app)
    .put('/products/' + idProduct)
    .set('access_token', access_token)
    .send({
      name: 'sweater unikSekali',
      image_url: 'https://id-test-11.slatic.net/p/046278f899ed2b1c214f662669779f68.jpg',
      price: 150000,
      stock: 150
    })
    .then(response => {
        const { body, status } = response
        expect(status).toEqual(200)
        expect(body).toHaveProperty('name', 'sweater unikSekali')
        expect(body).toHaveProperty('image_url', 'https://id-test-11.slatic.net/p/046278f899ed2b1c214f662669779f68.jpg')
        expect(body).toHaveProperty('price', 150000)
        expect(body).toHaveProperty('stock', 150)
        done()
    })
    .catch(err => {
      //console.log(err);
      done(err)
      
    })
  })
})

describe('test delete product' , () => {

  it('delete success', (done) => {
    request(app)
    .delete('/products/' + idProduct)
    .set('access_token', access_token)
    .then(response => {

        const { body, status } = response

        expect(status).toEqual(200)
        expect(body).toHaveProperty('msg', 'product has been successfully deleted')
        done()
    })
    .catch(err => {
      //console.log(err);
      done(err)
    })
  })
})

