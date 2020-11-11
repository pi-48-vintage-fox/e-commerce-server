const request = require("supertest")
const app = require("../app")
const {
  sequelize
} = require('../models/index')
const {
  queryInterface
} = sequelize
const {
  User,
  Product
} = require('../models/')
const {
  hashPassword
} = require('../helpers/bcrypt')
const {
  generateToken
} = require('../helpers/jwt')

let access_token = ""
let customer_token = ""
let id

beforeAll((done) => {
  let admin = {
    email: "yeska@mail.com",
    password: hashPassword("yeska", 10),
    role: "admin",
  }
  let customer = {
    email: "frans@mail.com",
    password: hashPassword("frans", 10),
    role: "customer"
  }

  User.create(admin)
    .then(data => {
      access_token = generateToken({
        id: data.id,
        email: data.email
      })
      return User.create(customer)
    })
    .then(data => {
      customer_token = generateToken({
        id: data.id,
        email: data.email
      })
      done()
    })
    .catch(err => {
      done(err)
    })
})

afterAll((done) => {
  queryInterface.bulkDelete("Products")
    .then(() => {
      return queryInterface.bulkDelete("Users")
    })
    .then(() => {
      done()
    })
    .catch((err) => {
      done(err)
    })
})


describe("Testing Create an product", () => {

  // SUCCESS CREATING PRODUCT
  test("Create Product Success", (done) => {
    request(app)
      .post("/products")
      .set("access_token", access_token) // <<< required 
      .send({
        name: "I-Phone Putin Version",
        price: 55000000,
        stock: 5,
        image_url: 'https://caviar.global/images/detailed/5/caviar_Putin_gold_3_catalog.png'
      })
      .set("Accept", "application/json")
      .then((res) => {
        const {
          status,
          body
        } = res
        expect(status).toBe(201) // <--- DATA CREATED
        expect(body).toHaveProperty("id", expect.any(Number))
        id = body.id
        expect(body).toHaveProperty("name", "I-Phone Putin Version")
        done()
      })
  })

  test("Create Product Failed -- Without Access Token", (done) => {
    request(app)
      .post("/products")
      .send({
        name: "I-Phone Putin Version",
        price: 55000000,
        stock: 5,
        image_url: 'https://caviar.global/images/detailed/5/caviar_Putin_gold_3_catalog.png'
      })
      .set("Accept", "application/json")
      // <<<< doesnt have access token
      .then((res) => {
        const {
          status,
          body
        } = res
        expect(status).toBe(401)
        expect(body).toHaveProperty("message", "Failed to Authenticate")
        done()
      })
  })

  test("Create Product Failed -- With Not Admin Access Token", (done) => {
    request(app)
      .post("/products")
      .set("access_token", customer_token)
      .send({
        name: "I-Phone Putin Version",
        price: 55000000,
        stock: 5,
        image_url: 'https://caviar.global/images/detailed/5/caviar_Putin_gold_3_catalog.png'
      })
      .set("Accept", "application/json")
      .then((res) => {
        const {
          status,
        } = res
        expect(status).toBe(401)
        done()
      })
  })

  test("Create Product Failed -- With the requested page not filled", (done) => {
    let emptyProductData = {
      name: "",
      price: 19500000,
      stock: 5,
      image_url: "https://www.lenovo.com/medias/lenovo-laptop-yoga-c940-hero-14-intel-2.png?context=bWFzdGVyfHJvb3R8ODU3OTZ8aW1hZ2UvcG5nfGg5Ny9oMjQvMTA2NTI3NjY3OTc4NTQucG5nfDI4YWUyYzBmNTM3YjE3NDQ4ODQ3Mzc3NjI3YWQ2ZGI5MmZkMjU1NTAzZGY3NzkxYWRhM2U4MGYzMmY0NDFjYmY",
    }
    request(app)
      .post("/products")
      .set("access_token", access_token)
      .send(emptyProductData)
      .set("Accept", "application/json")
      .then((res) => {
        const {
          status,
          body
        } = res
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", expect.any(String))
        done()
      })
  })

  test("Create Product Failed, Stock bigger than 0", (done) => {
    const wrongProductData = {
      name: "Lenovo Yoga C940",
      price: 23490000,
      stock: -1,
      image_url: "https://www.lenovo.com/medias/lenovo-laptop-yoga-c940-hero-14-intel-2.png?context=bWFzdGVyfHJvb3R8ODU3OTZ8aW1hZ2UvcG5nfGg5Ny9oMjQvMTA2NTI3NjY3OTc4NTQucG5nfDI4YWUyYzBmNTM3YjE3NDQ4ODQ3Mzc3NjI3YWQ2ZGI5MmZkMjU1NTAzZGY3NzkxYWRhM2U4MGYzMmY0NDFjYmY",
    }
    request(app)
      .post("/products")
      .set("access_token", access_token)
      .send(wrongProductData)
      .set("Accept", "application/json")
      .then((res) => {
        const {
          status,
          body
        } = res
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", expect.any(String))
        done()
      })
  })

  test("Create Product Failed, Price must bigger than 0", (done) => {
    const wrongProductData = {
      name: "Lenovo Yoga C940",
      price: -1000,
      stock: 1,
      image_url: "https://www.lenovo.com/medias/lenovo-laptop-yoga-c940-hero-14-intel-2.png?context=bWFzdGVyfHJvb3R8ODU3OTZ8aW1hZ2UvcG5nfGg5Ny9oMjQvMTA2NTI3NjY3OTc4NTQucG5nfDI4YWUyYzBmNTM3YjE3NDQ4ODQ3Mzc3NjI3YWQ2ZGI5MmZkMjU1NTAzZGY3NzkxYWRhM2U4MGYzMmY0NDFjYmY",
    }
    request(app)
      .post("/products")
      .set("access_token", access_token)
      .send(wrongProductData)
      .set("Accept", "application/json")
      .then((res) => {
        const {
          status,
          body
        } = res
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", expect.any(String))
        done()
      })
  })

  test("Create Product Failed, You enter wrong data type", (done) => {
    const wrongProductData = {
      name: "I phone X",
      price: "NaN",
      stock: "AAAA",
      image_url: "jajajaja"
    }
    request(app)
      .post("/products")
      .set("access_token", access_token)
      .send(wrongProductData)
      .set("Accept", "application/json")
      .then((res) => {
        const {
          status,
          body
        } = res
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", expect.any(String))
        done()
      })
      .catch(err => {
        console.log(err, "<<< ini di error get");
        done(err)
      })
  })

})

describe("Testing Read all products", () => {
  test("Get all products", (done) => {
    request(app)
      .get("/products")
      .set("access_token", access_token)
      .then((res) => {
        let {
          status,
          body
        } = res
        expect(status).toBe(200)
        expect(body.length).toEqual(1)
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  // FAILED GETTING PRODUCTS without access_token
  test("Failed to get products", (done) => {
    request(app)
      .get("/products")
      .set("access_token", "")
      .then((res) => {
        let {
          body,
          status
        } = res
        expect(status).toBe(401)
        expect(body).toHaveProperty('message', 'Failed to Authenticate')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})

describe("Testing Update Product Data", () => {

  test("Update Product Success", (done) => {
    request(app)
      .put(`/products/${id}`)
      .set("access_token", access_token)
      .send({
        name: "I-Phone Putin Version",
        price: 56000000,
        stock: 15,
        image_url: 'https://caviar.global/images/detailed/5/caviar_Putin_gold_3_catalog.png'
      })
      .set("Accept", "application/json")
      .then((res) => {
        const {
          status,
          body
        } = res
        expect(status).toBe(200)
        expect(body).toHaveProperty('id', expect.any(Number))
        expect(body).toHaveProperty('name', 'I-Phone Putin Version')
        expect(body).toHaveProperty('price', 56000000)
        expect(body).toHaveProperty('stock', 15)
        expect(body).toHaveProperty('image_url', expect.any(String))
        done()
      })
  })

  test("Update Product FAILED -- Attributes can't empty", (done) => {
    let emptyProductData = {
      name: "",
      price: 19500000,
      stock: 5,
      image_url: "https://www.lenovo.com/medias/lenovo-laptop-yoga-c940-hero-14-intel-2.png?context=bWFzdGVyfHJvb3R8ODU3OTZ8aW1hZ2UvcG5nfGg5Ny9oMjQvMTA2NTI3NjY3OTc4NTQucG5nfDI4YWUyYzBmNTM3YjE3NDQ4ODQ3Mzc3NjI3YWQ2ZGI5MmZkMjU1NTAzZGY3NzkxYWRhM2U4MGYzMmY0NDFjYmY",
    }

    request(app)
      .put(`/products/${id}`)
      .set("access_token", access_token)
      .send(emptyProductData)
      .set("Accept", "application/json")
      .then((res) => {
        const {
          status,
          body
        } = res
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", expect.any(String))
        done()
      })
  })

  test("Update Product FAILED -- Wrong Data Type", (done) => {
    const wrongProductData = {
      name: 14,
      price: "NaN",
      stock: "AAAA",
      image_url: "jajajaja"
    }
    request(app)
      .put(`/products/${id}`)
      .set("access_token", access_token)
      .send(wrongProductData)
      .then((res) => {
        const {
          status,
          body
        } = res
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", expect.any(String))
        done()
      })
  })

  test("Update Product FAILED -- Stock is Less than 0", (done) => {
    const wrongProductData = {
      name: "Lenovo Yoga C940",
      price: 1000,
      stock: -1,
      image_url: "https://www.lenovo.com/medias/lenovo-laptop-yoga-c940-hero-14-intel-2.png?context=bWFzdGVyfHJvb3R8ODU3OTZ8aW1hZ2UvcG5nfGg5Ny9oMjQvMTA2NTI3NjY3OTc4NTQucG5nfDI4YWUyYzBmNTM3YjE3NDQ4ODQ3Mzc3NjI3YWQ2ZGI5MmZkMjU1NTAzZGY3NzkxYWRhM2U4MGYzMmY0NDFjYmY",
    }
    request(app)
      .put(`/products/${id}`)
      .set("access_token", access_token)
      .send(wrongProductData)
      .set("Accept", "application/json")
      .then((res) => {
        const {
          status,
          body
        } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Minimum product stock is 1");
        done();
      });
  })

  test("Update Product FAILED -- Field is filled with inappropriate data type", (done) => {
    const wrongProductData = {
      name: "Lenovo Yoga C940",
      price: -1000,
      stock: 1,
      image_url: "https://www.lenovo.com/medias/lenovo-laptop-yoga-c940-hero-14-intel-2.png?context=bWFzdGVyfHJvb3R8ODU3OTZ8aW1hZ2UvcG5nfGg5Ny9oMjQvMTA2NTI3NjY3OTc4NTQucG5nfDI4YWUyYzBmNTM3YjE3NDQ4ODQ3Mzc3NjI3YWQ2ZGI5MmZkMjU1NTAzZGY3NzkxYWRhM2U4MGYzMmY0NDFjYmY",
    }
    request(app)
      .put(`/products/${id}`)
      .set("access_token", access_token)
      .send(wrongProductData)
      .set("Accept", "application/json")
      .then((res) => {
        const {
          status,
          body
        } = res
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", "Price must bigger than zero")
        done()
      })
  })

  test("Update Product FAILED -- Price is Less than 0", (done) => {
    const wrongProductData = {
      name: "I-Phone Putin Version",
      price: -1000,
      stock: 5,
      image_url: 'https://caviar.global/images/detailed/5/caviar_Putin_gold_3_catalog.png'
    }
    request(app)
      .put(`/products/${id}`)
      .set("access_token", access_token)
      .send(wrongProductData)
      .set("Accept", "application/json")
      .then((res) => {
        const {
          status,
          body
        } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Price must bigger than zero");
        done();
      });
  })
})

describe("Testing Delete Product", () => {

  test("Delete Product Success", (done) => {
    request(app)
      .delete(`/products/${id}`)
      .set("access_token", access_token)
      .then((res) => {
        const {
          status,
          body
        } = res
        expect(status).toBe(200)
        expect(body).toHaveProperty("message", expect.any(String))
        done()
      })
  })

  test("Delete Product Failed -- Without Access Token", (done) => {
    request(app)
      .delete(`/products/${id}`)
      .then((res) => {
        const {
          status,
          body
        } = res
        expect(status).toBe(401)
        expect(body).toHaveProperty("message", "Failed to Authenticate")
        done()
      })
  })

  test("Delete Product Failed -- With Not Admin Access Token", (done) => {
    request(app)
      .delete(`/products/${id}`)
      .set("access_token", customer_token)
      .then((res) => {
        const {
          status,
          body
        } = res
        expect(status).toBe(401)
        expect(body).toHaveProperty("message", "You don't have an access")
        done()
      })
      .catch(err => {
        done(err)
      })
  })

})