const request = require('supertest')
const app = require('../app')

// Failed
// Create
describe("Test failed CRUD products", () => {
  it("Test failed without access_token", () => {
    request(app)
    .post('/products')
    .send({
      name : "Sepatu Nike",
      image_url : "https://awsimages.detik.net.id/community/media/visual/2019/01/17/f31f05dd-5e6b-42f7-969d-c03ab4540729_169.jpeg?w=620",
      price : 1000000,
      stock : 5
    })
    .then((response) => {
      let { body, status } = response
      expect(status).toBe(400)
      expect(body).toHaveProperty(Object.keys(response.body))
      done()
    })
    .catch(err => {
      done()
    })
  })
})

describe("Test failed CRUD Products", () => {
  it()
})