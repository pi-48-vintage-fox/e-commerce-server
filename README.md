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

**Register**
----

    Register User

* **URL**

  /register

* **Method:**

  `POST`

* **Data Params**

  {
      email: "sample@gmail.com",
      password: "sample123"
  }

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
                `{
                    access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6IlNhbXBsZSBCaW4gU2FtcGxlIiwiZW1haWwiOiJzYW1wbGVAZ21haWwuY29tIiwiaWF0IjoxNjA0NjcxNzQ4fQ.jXKC9tF1UF9AuR37K7HYN8myvqmBnuVd6TpwNZ7qzFc,
                    id: 2,
                    email: 'sample@gmail.com',
                    role: 'customer'
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
    **Content:** 

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

**Show Product**
----

    Show products for customers

* **URL**

  /custProducts

* **Method:**

  `GET`

* **Data Params**

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
                `{
                    id : 1,
                    name: "Ikan Kembung",
                    image_url: "https://asset.kompas.com/crops/6B5mPXYb_znGkLNtY6yD6oeLmhA=/4x1:575x382/780x390/data/photo/2020/06/14/5ee6032855614.jpg",
                    price: "100000",
                    stock: 10,
                    category: "Fillet",
                    updatedAt: 20-10-2010,
                    createdAt: 20-10-2010
                }`

* **Error Response:**

  * **Code:** 500 BAD REQUEST <br />
    **Content:** 

**Show CART List**
----

    Show CART

* **URL**

  /carts/

* **Method:**

  `GET`

*  **URL Params**

   **Required:**

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
      [
    {
        "id": 47,
        "UserId": 3,
        "ProductId": 21,
        "quantity": 1,
        "status": "cart",
        "total_price": 300000,
        "createdAt": "2020-11-19T03:43:40.017Z",
        "updatedAt": "2020-11-19T03:43:40.017Z",
        "Product": {
            "id": 21,
            "name": "Dori",
            "image_url": "https://static.tokopedia.net/blog/wp-content/uploads/2019/08/3.-Rasa-1024x631.jpg",
            "price": 300000,
            "stock": 197,
            "category": "Fillet",
            "createdAt": "2020-11-14T08:51:03.094Z",
            "updatedAt": "2020-11-19T02:28:52.332Z"
        }
    }
]

* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{ error : "Not Found" }`

**Add CART**
----

    Add CART 

* **URL**

    /carts/:id

* **Method:**

  `POST`

*  **URL Params**

   **Required:**

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `[
            { 
                id : 1,
                ProductId: 2,
                UserId: 1,
                quantity: 1
                updatedAt: 20-10-2010,
                createdAt: 20-10-2010
            },
            { 
                id : 2,
                ProductId: 2,
                UserId: 1,
                quantity: 1
                updatedAt: 20-10-2010,
                createdAt: 20-10-2010
            }
        ]`


**Delete List**
----

    delete CART

* **URL**

  /carts/:id

* **Method:**

  `DELETE`

*  **URL Params**

   **Required:**
   **PARAMS:**
   {
     id: 2
   }

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    {
      message: 'Your cart has been deleted
    }

* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{ error : "Not Found" }`

**Update List**
----

    Update CART

* **URL**

  /carts/

* **Method:**

  `GET`

*  **URL Params**

   **Required:**
   **Data:**
   {
     quantity: 2
   }

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    {
      message: 'Your cart has been updated
    }

* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{ error : "Not Found" }`

**Checkout**
----

    Checkout

* **URL**

  /checkout

* **Method:**

  `POST`

*  **URL Params**

   **Required:**
   **Data:**

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    {
      message: 'Transaction success'
    }

* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{ error : "Not Found" }`

**Show TRANSACTIONS List**
----

    Show TRANSACTIONS

* **URL**

  /transactions

* **Method:**

  `GET`

*  **URL Params**

   **Required:**

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
      [
    {
        "id": 47,
        "UserId": 3,
        "ProductId": 21,
        "quantity": 1,
        "status": "cart",
        "total_price": 300000,
        "createdAt": "2020-11-19T03:43:40.017Z",
        "updatedAt": "2020-11-19T03:43:40.017Z",
        "Product": {
            "id": 21,
            "name": "Dori",
            "image_url": "https://static.tokopedia.net/blog/wp-content/uploads/2019/08/3.-Rasa-1024x631.jpg",
            "price": 300000,
            "stock": 197,
            "category": "Fillet",
            "createdAt": "2020-11-14T08:51:03.094Z",
            "updatedAt": "2020-11-19T02:28:52.332Z"
        }
    }
]

* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{ error : "Not Found" }`
