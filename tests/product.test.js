const request = require("supertest");
const app = require("../app");

const newProduct = {
    name: "Keseharian Rasulullah 24 Jam Aktivitas Sosok Insan Kamil",
    price: 49500,
    stock: 5,
    image_url: "https://togamas.com/css/images/items/potrait/kol-keseharian-rasulullah_54.jpg",
    CategoryId: 1,
};

const updatedProductData = {
    name: "Sepotong Senja Untuk Pacarku",
    price: 76500,
    stock: 10,
    image_url: "https://togamas.com/css/images/items/potrait/SEPOTONG-SENJA-UNTUK-PACARKU_425.jpg",
    CategoryId: 4,
};

let id = 0;

describe("Testing Create Product", () => {
    test("Create Product Success", (done) => {
        request(app)
            .post("/products")
            .send(newProduct)
            .set("Accept", "application/json")
            .set("access_token", process.env.ACCESS_TOKEN)
            .then(response => {
                const { status, body } = response
                id = body.id
                expect(status).toBe(201);
                expect(body).toHaveProperty("id", expect.any(Number))
                expect(body).toHaveProperty("name", expect.any(String))
                expect(body).toHaveProperty("image_url", expect.any(String))
                expect(body).toHaveProperty("price", expect.any(Number))
                expect(body).toHaveProperty("stock", expect.any(Number))
                expect(body).toHaveProperty("CategoryId", expect.any(Number))
                done()
            });
    });

    test("Create Product Failed, No access token", (done) => {
        request(app)
            .post("/products")
            .send(newProduct)
            .set("Accept", "application/json")
            .then((res) => {
                const { status, body } = res;
                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "Failed to Authenticate");
                done();
            });
    });

    test("Create Product Failed, Access Token not admin", (done) => {
        request(app)
            .post("/products")
            .send(newProduct)
            .set("Accept", "application/json")
            .set("access_token", process.env.ACCESS_TOKEN_NOT_ADMIN)
            .then((res) => {
                const { status, body } = res;
                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "Failed to Authenticate, Not an Admin");
                done();
            });
    });

    test("Create Product Failed, Empty field", (done) => {
        const wrongProductData = {
            name: "",
            price: 49500,
            stock: 5,
            image_url: "https://togamas.com/css/images/items/potrait/kol-keseharian-rasulullah_54.jpg",
            CategoryId: 1,
        };

        request(app)
            .post("/products")
            .send(wrongProductData)
            .set("Accept", "application/json")
            .set("access_token", process.env.ACCESS_TOKEN)
            .then((res) => {
                const { status, body } = res;
                expect(status).toBe(400);
                expect(body).toHaveProperty("message", expect.any(String));
                done();
            });
    });

    test("Create Product Failed, Stock Number less than 1", (done) => {
        const wrongProductData = {
            name: "Keseharian Rasulullah 24 Jam Aktivitas Sosok Insan Kamil",
            price: 49500,
            stock: -5,
            image_url: "https://togamas.com/css/images/items/potrait/kol-keseharian-rasulullah_54.jpg",
            CategoryId: 1,
        };

        request(app)
            .post("/products")
            .send(wrongProductData)
            .set("Accept", "application/json")
            .set("access_token", process.env.ACCESS_TOKEN)
            .then((res) => {
                const { status, body } = res;
                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "Stock must be greater than 0");
                done();
            });
    });

    test("Create Product Failed, Price less than 1", (done) => {
        const wrongProductData = {
            name: "Keseharian Rasulullah 24 Jam Aktivitas Sosok Insan Kamil",
            price: -49500,
            stock: 5,
            image_url: "https://togamas.com/css/images/items/potrait/kol-keseharian-rasulullah_54.jpg",
            CategoryId: 1,
        };

        request(app)
            .post("/products")
            .send(wrongProductData)
            .set("Accept", "application/json")
            .set("access_token", process.env.ACCESS_TOKEN)
            .then((res) => {
                const { status, body } = res;
                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "Price must be greater than 0");
                done();
            });
    });

    test("Create Product Failed, Enter wrong data type", (done) => {
        const wrongProductData = {
            name: "Keseharian Rasulullah 24 Jam Aktivitas Sosok Insan Kamil",
            price: 49500,
            stock: "lima",
            image_url: "https://togamas.com/css/images/items/potrait/kol-keseharian-rasulullah_54.jpg",
            CategoryId: 1,
        };

        request(app)
            .post("/products")
            .send(wrongProductData)
            .set("Accept", "application/json")
            .set("access_token", process.env.ACCESS_TOKEN)
            .then((res) => {
                const { status, body } = res;
                expect(status).toBe(400);
                expect(body).toHaveProperty("message", expect.any(String));
                done();
            });
    });
});

describe("Testing Get all Product", () => {
    test("Get all Product Success", (done) => {
        request(app)
            .get("/products")
            .set("access_token", process.env.ACCESS_TOKEN)
            .then((res) => {
                const { status, body } = res;
                expect(status).toBe(200);
                expect(body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            id: expect.any(Number),
                            name: expect.any(String),
                            image_url: expect.any(String),
                            category_name: expect.any(String),
                            price: expect.any(Number),
                            stock: expect.any(Number),
                        }),
                    ]),
                );
                done();
            });
    });

    test("Get all Product Failed, No Access Token", (done) => {
        request(app)
            .get("/products")
            .then((res) => {
                const { status, body } = res;
                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "Failed to Authenticate");
                done();
            });
    });
});

describe("Testing Update Product Data", () => {
    test("Update Product Success", (done) => {
        request(app)
            .put(`/products/${id}`)
            .send(updatedProductData)
            .set("Accept", "application/json")
            .set("access_token", process.env.ACCESS_TOKEN)
            .then((res) => {
                const { status, body } = res;
                expect(status).toBe(200);
                expect(body).toEqual(
                    expect.objectContaining({
                        id: id,
                        name: updatedProductData.name,
                        image_url: updatedProductData.image_url,
                        category_name: expect.any(String),
                        price: updatedProductData.price,
                        stock: updatedProductData.stock,
                    }),
                );
                done();
            });
    });

    test("Update Product Failed, product ID doesn't exist", (done) => {
        request(app)
            .put(`/products/1000001`)
            .send(updatedProductData)
            .set("Accept", "application/json")
            .set("access_token", process.env.ACCESS_TOKEN)
            .then((res) => {
                const { status, body } = res;
                console.log(status, body);
                expect(status).toBe(404);
                expect(body).toHaveProperty("message", "Product is not Found");
                done();
            });
    });

    test("Update Product Failed, No access token", (done) => {
        request(app)
            .put(`/products/${id}`)
            .send(updatedProductData)
            .set("Accept", "application/json")
            .then((res) => {
                const { status, body } = res;
                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "Failed to Authenticate");
                done();
            });
    });

    test("Update Product Failed, Access Token not admin", (done) => {
        request(app)
            .put(`/products/${id}`)
            .send(updatedProductData)
            .set("Accept", "application/json")
            .set("access_token", process.env.ACCESS_TOKEN_NOT_ADMIN)
            .then((res) => {
                const { status, body } = res;
                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "Failed to Authenticate, Not an Admin");
                done();
            });
    });

    test("Update Product Failed, Empty field", (done) => {
        const wrongProductData = {
            name: "",
            price: 49500,
            stock: 5,
            image_url: "https://togamas.com/css/images/items/potrait/kol-keseharian-rasulullah_54.jpg",
            CategoryId: 1,
        };

        request(app)
            .put(`/products/${id}`)
            .send(wrongProductData)
            .set("Accept", "application/json")
            .set("access_token", process.env.ACCESS_TOKEN)
            .then((res) => {
                const { status, body } = res;
                expect(status).toBe(400);
                expect(body).toHaveProperty("message", expect.any(String));
                done();
            });
    });

    test("Update Product Failed, Stock Number less than 1", (done) => {
        const wrongProductData = {
            name: "Keseharian Rasulullah 24 Jam Aktivitas Sosok Insan Kamil",
            price: 49500,
            stock: -5,
            image_url: "https://togamas.com/css/images/items/potrait/kol-keseharian-rasulullah_54.jpg",
            CategoryId: 1,
        };

        request(app)
            .put(`/products/${id}`)
            .send(wrongProductData)
            .set("Accept", "application/json")
            .set("access_token", process.env.ACCESS_TOKEN)
            .then((res) => {
                const { status, body } = res;
                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "Stock must be greater than 0");
                done();
            });
    });

    test("Create Product Failed, Price less than 1", (done) => {
        const wrongProductData = {
            name: "Keseharian Rasulullah 24 Jam Aktivitas Sosok Insan Kamil",
            price: -49500,
            stock: 5,
            image_url: "https://togamas.com/css/images/items/potrait/kol-keseharian-rasulullah_54.jpg",
            CategoryId: 1,
        };

        request(app)
            .put(`/products/${id}`)
            .send(wrongProductData)
            .set("Accept", "application/json")
            .set("access_token", process.env.ACCESS_TOKEN)
            .then((res) => {
                const { status, body } = res;
                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "Price must be greater than 0");
                done();
            });
    });

    test("Create Product Failed, Enter wrong data type", (done) => {
        const wrongProductData = {
            name: "Keseharian Rasulullah 24 Jam Aktivitas Sosok Insan Kamil",
            price: "empat ratus",
            stock: 5,
            image_url: "https://togamas.com/css/images/items/potrait/kol-keseharian-rasulullah_54.jpg",
            CategoryId: 1,
        };

        request(app)
            .put(`/products/${id}`)
            .send(wrongProductData)
            .set("Accept", "application/json")
            .set("access_token", process.env.ACCESS_TOKEN)
            .then((res) => {
                const { status, body } = res;
                expect(status).toBe(400);
                expect(body).toHaveProperty("message", expect.any(String));
                done();
            });
    });
});

describe("Testing Delete Product Data", () => {
    test("Delete Product Success", (done) => {
        request(app)
            .delete(`/products/${id}`)
            .set("access_token", process.env.ACCESS_TOKEN)
            .then((res) => {
                const { status, body } = res;
                expect(status).toBe(200);
                expect(body).toHaveProperty("message", "Product is sucessfully deleted");
                done();
            });
    });

    test("Delete Product Failed, product ID doesn't exist", (done) => {
        request(app)
            .delete(`/products/100001`)
            .set("access_token", process.env.ACCESS_TOKEN)
            .then((res) => {
                const { status, body } = res;
                expect(status).toBe(404);
                expect(body).toHaveProperty("message", "Product is not Found");
                done();
            });
    });

    test("Delete Product Failed, No access token", (done) => {
        request(app)
            .delete(`/products/${id}`)
            .then((res) => {
                const { status, body } = res;
                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "Failed to Authenticate");
                done();
            });
    });

    test("Update Product Failed, Access Token not admin", (done) => {
        request(app)
            .delete(`/products/${id}`)
            .set("access_token", process.env.ACCESS_TOKEN_NOT_ADMIN)
            .then((res) => {
                const { status, body } = res;
                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "Failed to Authenticate, Not an Admin");
                done();
            });
    });
});
