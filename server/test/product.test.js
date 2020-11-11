const request = require('supertest')
const app = require('../app')

let access_token = ''

describe('Test Endpoints POST /product',()=>{
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
        done()
        })
    })
    it('Test invalid fetch product success',(done)=>{
        request(app)
        let invalid_access_token = ''
        .get('/product')
        .set('access_token', invalid_access_token)
        .then(response=>{
            let{status} = response
            expect(status).toEqual(200)
            done()
        })
        .catch(err => {
        done()
        })
    })
})