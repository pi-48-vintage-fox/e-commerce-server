const request = require('supertest')
const app = require('../app')


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

  // it('Have Access Token, not admin',(done)=>{

  // })

  // it('Required Field Not Fully Completed', (done)=>{

  // })

  // it('Stock Negative', (done)=>{

  // })

  // it('Price Negative',(done)=>{

  // })

  // it('Wrong Datatypes',(done)=>{

  // })
})