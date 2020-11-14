# e-commerce-server

**Login**
----

    Login User

* **URL**

  /login

* **Method:**

  `POST`

* **Data Params**

  {
      email: "sample@gmail.com",
      password: "sample123"
  }

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
                `{
                    access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6IlNhbXBsZSBCaW4gU2FtcGxlIiwiZW1haWwiOiJzYW1wbGVAZ21haWwuY29tIiwiaWF0IjoxNjA0NjcxNzQ4fQ.jXKC9tF1UF9AuR37K7HYN8myvqmBnuVd6TpwNZ7qzFc,
                    id: 2,
                    email: 'sample@gmail.com'
                }`

* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Wrong email or password" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Wrong email or password" }`

**GET ALL PRODUCT**
----

    Get all Product


* **URL**

  /products

* **Method:**

  `GET`

*  **URL Params**

   **Required:**

*Success Response:**

  * **Code:** 200 <br />
    **Content:** `[
        { 
            id : 1,
            name: "Ikan Kembung",
            image_url: "https://asset.kompas.com/crops/6B5mPXYb_znGkLNtY6yD6oeLmhA=/4x1:575x382/780x390/data/photo/2020/06/14/5ee6032855614.jpg",
            price: "100000",
            stock: 10,
            category: "Fillet",
            updatedAt: 20-10-2010,
            createdAt: 20-10-2010
        }
    ]`

* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Cannot get /todo/1" }`

**Add PRODUCT**
----

    Add Product List after login

* **URL**

    /product

* **Method:**

  `POST`

*  **URL Params**

   **Required:**

*Data Params**

    { 
        id : 2,
        name: "Ikan Kakap",
        image_url: "https://asset.kompas.com/crops/6B5mPXYb_znGkLNtY6yD6oeLmhA=/4x1:575x382/780x390/data/photo/2020/06/14/5ee6032855614.jpg",
        price: "100000",
        stock: 10,
        category: "Fillet",
        updatedAt: 20-10-2010,
        createdAt: 20-10-2010
    }


* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `[
            { 
                id : 1,
                name: "Ikan Kembung",
                image_url: "https://asset.kompas.com/crops/6B5mPXYb_znGkLNtY6yD6oeLmhA=/4x1:575x382/780x390/data/photo/2020/06/14/5ee6032855614.jpg",
                price: "100000",
                stock: 10,
                category: "Fillet",
                updatedAt: 20-10-2010,
                createdAt: 20-10-2010
            },
            { 
                id : 2,
                name: "Ikan Kakap",
                image_url: "https://asset.kompas.com/crops/6B5mPXYb_znGkLNtY6yD6oeLmhA=/4x1:575x382/780x390/data/photo/2020/06/14/5ee6032855614.jpg",
                price: "100000",
                stock: 10,
                category: "Fillet",
                updatedAt: 20-10-2010,
                createdAt: 20-10-2010
            }
        ]`

* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

**Edit PRODUCT**
----

    Edit Product after login

* **URL**

  /products/:id

* **Method:**

  `PUT`

*  **URL Params**

   **Required:**

  `productsId=[integer]`

* **Data Params**

    { 
        id : 2,
        name: "Ikan Kakap Edit",
        image_url: "https://asset.kompas.com/crops/6B5mPXYb_znGkLNtY6yD6oeLmhA=/4x1:575x382/780x390/data/photo/2020/06/14/5ee6032855614.jpg",
        price: "100000",
        stock: 10,
        category: "Fillet",
        updatedAt: 20-10-2010,
        createdAt: 20-10-2010
    }

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ 
        message: 'Product has been updated'
    }`

* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : "Server Internal Error" }`

**Delete PRODUCT List**
----

    Delete PRODUCT after login

* **URL**

  /products/:id

* **Method:**

  `DELETE`

*  **URL Params**

   **Required:**

  `taksId=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** { message: 'Product has been deleted' }

* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{ error : "Not Found" }`

