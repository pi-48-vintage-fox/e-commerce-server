const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models/index");
const { queryInterface } = sequelize;
const {User, Product, Order} = require("../models/index")
const { generateToken } = require("../helpers/jwt");

let access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYwNTMzMzI5MH0.9LWWBp14x2e-0LLfyFICmPg8uT_g-tJYbG44bKmyJCg"
let access_token_cust
let idUser
let idProduct

let dataUser = {
    name: "admin",
    email: "admin@mail.com",
    password: "1234",
    image:
      "https://www.freepik.com/free-photo/young-attractive-handsome-guy-feels-delighted-gladden-amazed_10518607.htm",
    role: "admin",
}

let product =
    {
    name: "Jacket",
    image_url: "https://www.freepik.com/free-psd/iphone-11-pro-mockup_10313276.html",
    S: 3,
    M: 5,
    L: 10,
    XL: 12,
    price: 150000
}

beforeAll(() => {
    // if(process.env.NODE_ENV == "test")
    User.create(dataUser, {returning: true})
    .then(res => {
        // console.log(res, "ini res")
        const token = generateToken({
            id: res.id,
            name: res.name,
            email: res.email,
            role: res.role
        });
        // access_token = {
        //     access_token: token,
        //     name: res.name
        // }
    })
    .catch(err => console.log(err))
})

afterAll(() => {
    queryInterface
      .bulkDelete("Products", null)
      .then((res) => {
        return queryInterface.bulkDelete("Users", null)
      })
      .then(res => {
        
      })
      .catch((err) => {
        // console.log(err);
      });
  });

describe("Post add products endpoint /products", () => {
    it("success add product", (done) => {
        request(app)
        .post("/products")
        .send(product)
        .set("access_token", access_token)
        .end((err, res) => {
            if(err) return done(err)
            expect(res.status).toBe(201)
            expect(res.body).toEqual(expect.objectContaining(product));
            idProduct = res.body.id
            done()
        })
    })

    it("failed add product - name product is required", (done) => {
        const newProduct = {...product, name: ""}
        request(app)
        .post("/products")
        .send(newProduct)
        .set("access_token", access_token)
        .end((err, res) => {
            if(err) return done(err)
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty("errorMsg", "Name product is required");
            done()
        })
    })

    it("failed add product - image product is required", (done) => {
        const newProduct = {...product, image_url: ""}
        request(app)
        .post("/products")
        .send(newProduct)
        .set("access_token", access_token)
        .end((err, res) => {
            if(err) return done(err)
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty("errorMsg", "Image product is required");
            done()
        })
    })

    it("failed add product - Stock size S product is required", (done) => {
        const newProduct = {...product, S: ""}
        request(app)
        .post("/products")
        .send(newProduct)
        .set("access_token", access_token)
        .end((err, res) => {
            if(err) return done(err)
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty("errorMsg", "Stock size S product is required");
            done()
        })
    })

    it("failed add product - Tidak boleh memasukan angka minus dan minimal 0", (done) => {
        const newProduct = {...product, S: -1}
        request(app)
        .post("/products")
        .send(newProduct)
        .set("access_token", access_token)
        .end((err, res) => {
            if(err) return done(err)
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty("errorMsg", "Tidak boleh memasukan angka minus dan minimal 0");
            done()
        })
    })

    it("failed add product - Stock size M product is required", (done) => {
        const newProduct = {...product, M: ""}
        request(app)
        .post("/products")
        .send(newProduct)
        .set("access_token", access_token)
        .end((err, res) => {
            if(err) return done(err)
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty("errorMsg", "Stock size M product is required");
            done()
        })
    })

    it("failed add product - Tidak boleh memasukan angka minus dan minimal 0", (done) => {
        const newProduct = {...product, M: -1}
        request(app)
        .post("/products")
        .send(newProduct)
        .set("access_token", access_token)
        .end((err, res) => {
            if(err) return done(err)
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty("errorMsg", "Tidak boleh memasukan angka minus dan minimal 0");
            done()
        })
    })

    it("failed add product - Stock size L product is required", (done) => {
        const newProduct = {...product, L: ""}
        request(app)
        .post("/products")
        .send(newProduct)
        .set("access_token", access_token)
        .end((err, res) => {
            if(err) return done(err)
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty("errorMsg", "Stock size L product is required");
            done()
        })
    })

    it("failed add product - Tidak boleh memasukan angka minus dan minimal 0", (done) => {
        const newProduct = {...product, L: -1}
        request(app)
        .post("/products")
        .send(newProduct)
        .set("access_token", access_token)
        .end((err, res) => {
            if(err) return done(err)
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty("errorMsg", "Tidak boleh memasukan angka minus dan minimal 0");
            done()
        })
    })

    it("failed add product - Stock size XL product is required", (done) => {
        const newProduct = {...product, XL: ""}
        request(app)
        .post("/products")
        .send(newProduct)
        .set("access_token", access_token)
        .end((err, res) => {
            if(err) return done(err)
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty("errorMsg", "Stock size XL product is required");
            done()
        })
    })

    it("failed add product - Tidak boleh memasukan angka minus dan minimal 0", (done) => {
        const newProduct = {...product, XL: -1}
        request(app)
        .post("/products")
        .send(newProduct)
        .set("access_token", access_token)
        .end((err, res) => {
            if(err) return done(err)
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty("errorMsg", "Tidak boleh memasukan angka minus dan minimal 0");
            done()
        })
    })

    it("failed add product - Price product is required", (done) => {
        const newProduct = {...product, price: ""}
        request(app)
        .post("/products")
        .send(newProduct)
        .set("access_token", access_token)
        .end((err, res) => {
            if(err) return done(err)
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty("errorMsg", "Price product is required");
            done()
        })
    })
    it("failed add product - Tidak boleh memasukan angka minus dan minimal 0", (done) => {
        const newProduct = {...product, price: -1}
        request(app)
        .post("/products")
        .send(newProduct)
        .set("access_token", access_token)
        .end((err, res) => {
            if(err) return done(err)
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty("errorMsg", "Tidak boleh memasukan angka minus dan minimal 0");
            done()
        })
    })

})

describe("GET all products with endpoint /produts", () => {
    it("Success fetch all products", (done) => {
        request(app)
        .get("/products")
        .set("access_token", access_token)
        .end((err, res) => {
            if(err) return done(err)
            console.log(res.body[0], 'ini res body di get')
            expect(res.status).toBe(200)
            expect(res.body[0]).toEqual(expect.objectContaining(product));
            // expect(res.body).toHaveProperty("name", "Jackets")
            done()
        })
    })
})

describe("PUT edit product with endpoint /products/:id", () => {
    it("success edit product", (done) => {
        const newProduct = { ...product, name: "Celana", price:500000}
        request(app)
        .put(`/products/${idProduct}`)
        .send(newProduct)
        .set("access_token", access_token)
        .end((err, res) => {
            if(err) return done(err)
            expect(res.status).toBe(200)
            expect(res.body).toEqual(expect.objectContaining(newProduct));
            done()
        })
    })
    it("failed edit product - name product is required", (done) => {
        const newProduct = {...product, name: ""}
        request(app)
        .put(`/products/${idProduct}`)
        .send(newProduct)
        .set("access_token", access_token)
        .end((err, res) => {
            if(err) return done(err)
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty("errorMsg", "Name product is required");
            done()
        })
    })

    it("failed edit product - image product is required", (done) => {
        const newProduct = {...product, image_url: ""}
        request(app)
        .put(`/products/${idProduct}`)
        .send(newProduct)
        .set("access_token", access_token)
        .end((err, res) => {
            if(err) return done(err)
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty("errorMsg", "Image product is required");
            done()
        })
    })

    it("failed edit product - Stock size S product is required", (done) => {
        const newProduct = {...product, S: ""}
        request(app)
        .put(`/products/${idProduct}`)
        .send(newProduct)
        .set("access_token", access_token)
        .end((err, res) => {
            if(err) return done(err)
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty("errorMsg", "Stock size S product is required");
            done()
        })
    })
    it("failed edit product - Tidak boleh memasukan angka minus dan minimal 0", (done) => {
        const newProduct = {...product, S: -1}
        request(app)
        .put(`/products/${idProduct}`)
        .send(newProduct)
        .set("access_token", access_token)
        .end((err, res) => {
            if(err) return done(err)
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty("errorMsg", "Tidak boleh memasukan angka minus dan minimal 0");
            done()
        })
    })

    it("failed edit product - Stock size M product is required", (done) => {
        const newProduct = {...product, M: ""}
        request(app)
        .put(`/products/${idProduct}`)
        .send(newProduct)
        .set("access_token", access_token)
        .end((err, res) => {
            if(err) return done(err)
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty("errorMsg", "Stock size M product is required");
            done()
        })
    })
    it("failed edit product - Tidak boleh memasukan angka minus dan minimal 0", (done) => {
        const newProduct = {...product, M: -1}
        request(app)
        .put(`/products/${idProduct}`)
        .send(newProduct)
        .set("access_token", access_token)
        .end((err, res) => {
            if(err) return done(err)
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty("errorMsg", "Tidak boleh memasukan angka minus dan minimal 0");
            done()
        })
    })

    it("failed edit product - Stock size L product is required", (done) => {
        const newProduct = {...product, L: ""}
        request(app)
        .put(`/products/${idProduct}`)
        .send(newProduct)
        .set("access_token", access_token)
        .end((err, res) => {
            if(err) return done(err)
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty("errorMsg", "Stock size L product is required");
            done()
        })
    })
    it("failed edit product - Tidak boleh memasukan angka minus dan minimal 0", (done) => {
        const newProduct = {...product, L: -1}
        request(app)
        .put(`/products/${idProduct}`)
        .send(newProduct)
        .set("access_token", access_token)
        .end((err, res) => {
            if(err) return done(err)
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty("errorMsg", "Tidak boleh memasukan angka minus dan minimal 0");
            done()
        })
    })

    it("failed edit product - Stock size XL product is required", (done) => {
        const newProduct = {...product, XL: ""}
        request(app)
        .put(`/products/${idProduct}`)
        .send(newProduct)
        .set("access_token", access_token)
        .end((err, res) => {
            if(err) return done(err)
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty("errorMsg", "Stock size XL product is required");
            done()
        })
    })
    it("failed edit product - Tidak boleh memasukan angka minus dan minimal 0", (done) => {
        const newProduct = {...product, XL: -1}
        request(app)
        .put(`/products/${idProduct}`)
        .send(newProduct)
        .set("access_token", access_token)
        .end((err, res) => {
            if(err) return done(err)
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty("errorMsg", "Tidak boleh memasukan angka minus dan minimal 0");
            done()
        })
    })

    it("failed edit product - Price product is required", (done) => {
        const newProduct = {...product, price: ""}
        request(app)
        .put(`/products/${idProduct}`)
        .send(newProduct)
        .set("access_token", access_token)
        .end((err, res) => {
            if(err) return done(err)
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty("errorMsg", "Price product is required");
            done()
        })
    })
    it("failed edit product - Tidak boleh memasukan angka minus dan minimal 0", (done) => {
        const newProduct = {...product, price: -1}
        request(app)
        .put(`/products/${idProduct}`)
        .send(newProduct)
        .set("access_token", access_token)
        .end((err, res) => {
            if(err) return done(err)
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty("errorMsg", "Tidak boleh memasukan angka minus dan minimal 0");
            done()
        })
    })
})

describe("DELETE product with endpoint /products/:id", () => {
    it("Success delete product", (done) => {
        request(app)
        .delete(`/products/${idProduct}`)
        .set("access_token", access_token)
        .end((err, res) => {
            if(err) return done(err)
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty("messageSuccess", "Success delete product");
            done()
        })
    })
})