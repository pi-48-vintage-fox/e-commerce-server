const request = require('supertest');
const app = require('../app');
const {sequelize} = require('../models/index');
const {queryInterface} = sequelize;

let access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJpYXQiOjE2MDUwMjEwMDl9.rKPG5lI3koAFsTwcfDKAOvxJGmYt5W6K8E3IKQhgJI8';

describe('GET / categories', () => {
  it('response get category', (done) => {
    request(app)
      .get('/categories')
      .then(resp => {
        expect(resp.status).toBe(200)
        done()
      })
      .catch(console.log)
  })

  it('response error get category', (done) => {
    request(app)
      .get('/categories')
      .then(resp => {
        expect(resp.status).toBe(500);
        done()
      })
      .catch(err => {
        console.log(err);
        done();
      })
  })
})

describe('POST/ categories', () => {
  it('response add new category', (done) => {
    request(app)
      .post('/categories')
      .send({
        name: 'Fashion'
      })
      .then(resp => {
        expect(resp.status).toBe(201)
        expect(resp.body).toHaveProperty("name", "Fashion")
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })

  it('response fail add product, price or stock cannot less than 0', (done) => {
    request(app)
    .post('/products')
    .set('access_token', access_token)
    .send({
        name: "Fashion"
    })
    .then(response => {
      const { body, status } = response
      expect(status).toEqual(400)
      expect(body).toHaveProperty('message', "Price or stock must be more than 0")
      done()
    })
    .catch(err => {
      console.log(err)
        done()
    })
  })
})