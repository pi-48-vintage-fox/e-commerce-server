# e-commercer0-server

**e-commercer0-server**

----

```
 Manage All about products, user, cart
  - Create new product
  - Show All product
  - Get One Product
  - Update data product
  - Delete data product
```
  
* **RESTful API end point**

```
    POST   /products
    GET    /products
    GET   /products/:id
    PUT    /products/:id
    DELETE /products/:id

    POST /login
    POST /register

    GET /customers
    POST /customers/cart
    GET /customers/cart
    DELETE /customers/cart/:id
    PATCH /customers/cart/:id
    PATCH /customers/cart
```



1. POST  `/products`

    `Creating new products`
  
* **URL**

  `/products`

* **Method:**
  
   `POST`
  
* **Data Headers**
    ```
    Content-Type : app.json,
    access_token : access_token
    
    ```
* **Data Body**

  * **Endpoint ini akan menerima request body:**
  ```
    name, 
    price, 
    stock, 
    image_url
    
  ```
  Request Headers
  ```
    Content-type: app/json
    access_token: token
  ```

  Request Body
    ```JSON
    {
      "name" : "Kopi Toraja 100 g",
      "price ": 100000,
      "stock" : 100,
      "image-url": "www.image.jpg"
    }
    ```
 
* **Success Response:**

  
  * **Code:** 201 <br />
  * **Response:** 
  ```JSON
    {
      "name" : "Kopi Toraja 100 g",
      "price ": 100000,
      "stock" : 100,
      "image-url": "www.image.jpg"
    }
  ```
 
* **Error Response:**

    get failed response because the validation not fulfill

  * **Code:** 400 Bad Request  <br />
    **Content:** `{ message : "message about validation error" }`

  get failed because server error
    * **Code:** 500 Internal server error <br />

2. GET  `/products`

    `Get All data products`

* **URL**

  `/products`

* **Method:**
  
   `GET`

* **Data Headers**
    ```
    Content-Type : app.json,
    access_token : access_token
    
    ```
* **Data Body**

  `none`
 
* **Success Response:**

  
  * **Code:** 200 <br />
  * **Response:** 
  ```JSON
    [
      {
      "name" : "Kopi Toraja 100 g",
      "price ": 100000,
      "stock" : 100,
      "image-url": "www.image.jpg"
      }
    ]
  ```
 
* **Error Response:**

  get failed because server error
    * **Code:** 500 Internal server error <br />

3. GET   `/products/:id`

    `Show data products by id`
* **URL**

  `/products/:id`

* **Method:**
  
   `GET`

* **Data Headers**
    ```
    Content-Type : app.json,
    access_token : access_token
    
    ```
* **Data Params**

  * **Endpoint ini akan menerima request params:**

    `id`


* **Success Response:**
  * **Code:** 200 <br />
  * **Response:** 
  ```JSON
    
      {
      "name" : "Kopi Toraja 100 g",
      "price ": 100000,
      "stock" : 100,
      "image-url": "www.image.jpg"
      }
      
    
  ```
 
* **Error Response:**

  get failed because server error
    * **Code:** 500 Internal server error <br />

4. PUT `/products/:id`

    `Update All data products by id`
* **URL**

  `/products/:id`

* **Method:**
  
   `PUT`

* **Data Params**

  * **Endpoint ini akan menerima request params:**

    `id`
  * **Data Headers**
    ```
    Content-Type : app.json,
    access_token : access_token
    
    ```
  * **Data Body**

  * **Endpoint ini akan menerima request body:**
  ```
    name, 
    price, 
    stock,
    image_url
  ```

  Request Body
    ```JSON
    {
      {
      "name" : "Kopi Aceh robusta 100 g",
      "price ": 50000,
      "stock" : 50,
      "image-url": "www.image1.jpg"
      }
    }
    ```
 
* **Success Response:**
  * **Code:** 200 <br />
  * **Response:** 
  ```JSON
    {
      "name" : "Kopi Aceh robusta 100 g",
      "price ": 50000,
      "stock" : 50,
      "image-url": "www.image1.jpg"
    }
  ```
 
* **Error Response:**

  get failed response because the validation not fulfill

  * **Code:** 400 Bad Request  <br />
    **Content:** `{ message : "message about validation error" }`

  get failed response because  data products not found

  * **Code:** 404 Not Found  <br />
    **Content:** `{ message : "data not found" }`

  get failed because server error
    * **Code:** 500 Internal server error <br />


5. DELETE  `/products/:id`

    `DELETE data products by id`
* **URL**

  `/products/:id`

* **Method:**
  
   `DELETE`

* **Data Params**

  * **Endpoint ini akan menerima request params:**

    `id`

 
* **Success Response:**
  * **Code:** 200 <br />
  * **Response:** 
  ```JSON
    {
      "message" : "products success delete"
    }
  ```
 

* **Error Response:**


  get failed response because  data products not found

  * **Code:** 404 Not Found  <br />
    **Content:** `{ message : "data not found" }`

  get failed because server error
    * **Code:** 500 Internal server error <br />

User

6. Post `/login`
* **Method:**
  
   `Post`


* **Data Body**

  ```
    email, 
    password
  ```
* **Success Response:**

  
  * **Code:** 200 <br />
  * **Response:** 
  ```JSON
    {"access_token" : "token"}
  ```
 
* **Error Response:**

  get failed because server error
    * **Code:** 500 Internal server error <br />

7.Post `/register`
* **Method:**
  
   `Post`


* **Data Body**

  ```
    email, 
    password
  ```
* **Success Response:**

  
  * **Code:** 201 <br />
  * **Response:** 
  ```JSON
    {
      "email" : "email",
    }
  ```
 
* **Error Response:**

  get failed because server error
    * **Code:** 500 Internal server error <br />

 

8. GET  `/customers`

    `Get All data products`

* **URL**

  `/customers`

* **Method:**
  
   `GET`

* **Data Body**

  `none`
 
* **Success Response:**

  
  * **Code:** 200 <br />
  * **Response:** 
  ```JSON
    [
      {
      "name" : "Kopi Toraja 100 g",
      "price ": 100000,
      "stock" : 100,
      "image-url": "www.image.jpg"
      }
    ]
  ```
 
* **Error Response:**

  get failed because server error
    * **Code:** 500 Internal server error <br />

9. POST  `/customers/cart`

    `Creating new cart`
  
* **URL**

  `/customers/cart`

* **Method:**
  
   `POST`
  
* **Data Headers**
    ```
    Content-Type : app.json,
    access_token : access_token
    
    ```
* **Data Body**

  * **Endpoint ini akan menerima request body:**
  ```
    productId, 
    quantity, 
    
  ```
  Request Headers
  ```
    Content-type: app/json
    access_token: token
  ```

  Request Body
    ```JSON
    {
      "productId ": 19,
      "quantity" : 1,
    }
    ```
 
* **Success Response:**

  
  * **Code:** 201 <br />
  * **Response:** 
  ```JSON
    {
      
      "CartId" : 13,
      "ProductId ": 19,
      "quantity" : 1,
      "total": 20000,
       "updatedAt": "2020-11-19T08:31:09.111Z",
      "createdAt": "2020-11-19T08:31:09.111Z"
    
    }
  ```
 
* **Error Response:**

    get failed response because the validation not fulfill

  * **Code:** 400 Bad Request  <br />
    **Content:** `{ message : "message about validation error" }`

  get failed because server error
    * **Code:** 500 Internal server error <br />

10. POST  `/customers/cart`

    `GET cart login users`
  
* **URL**

  `/customers/cart`

* **Method:**
  
   `GET`
  
* **Data Headers**
    ```
    Content-Type : app.json,
    access_token : access_token
    
    ```
 
* **Success Response:**

  
  * **Code:** 200 <br />
  * **Response:** 
  ```JSON
   {
    "carts": [
        {
            "id": 57,
            "product": "Kenya AA Coffee 1000 g",
            "productId": 19,
            "image_url": "https://i0.wp.com/coffeeandcheck.com/wp-content/uploads/2020/04/kenya.jpg?resize=600%2C600&ssl=1",
            "price": 125000,
            "quantity": 1,
            "total": 125000,
            "stock": 85
        }
    ]
}

 
* **Error Response:**

    get failed response because the validation not fulfill

  * **Code:** 400 Bad Request  <br />
    **Content:** `{ message : "message about validation error" }`

  get failed because server error
    * **Code:** 500 Internal server error <br />
11. DELETE  `/customers/cart/:id`

    `DELETE data cart by id`
* **URL**

  `/customer/cart/:id`

* **Method:**
  
   `DELETE`

* **Data Params**

  * **Endpoint ini akan menerima request params:**

    `id`

 
* **Success Response:**
  * **Code:** 200 <br />
  * **Response:** 
  ```JSON
    {
      "message" : "cart success delete"
    }
  ```
 

* **Error Response:**


  get failed response because  data cart not found

  * **Code:** 404 Not Found  <br />
    **Content:** `{ message : "data not found" }`

  get failed because server error
    * **Code:** 500 Internal server error <br />
14. PATCH  `/customers/cart/`

    `Checkout barang cart`
* **URL**

  `/customer/cart/`

* **Method:**
  
   `PATCH`

* **Data Params**


 
* **Data Body**
    ```
   carts
    ```
    ``` JSON
      [{
      
      "CartId" : 13,
      "ProductId ": 19,
      "quantity" : 1,
      "total": 20000,
       "updatedAt": "2020-11-19T08:31:09.111Z",
      "createdAt": "2020-11-19T08:31:09.111Z"
    
    }]
    ```
* **Success Response:**
  * **Code:** 200 <br />
  * **Response:** 
  ```JSON
   {"msg": "checkout sukses"}
  ```
 

* **Error Response:**


  get failed response because  data cart not found

  * **Code:** 404 Not Found  <br />
    **Content:** `{ message : "data not found" }`

  get failed because server error
    * **Code:** 500 Internal server error <br />

13. PATCH  `/customers/cart/:id`

    `Update quantity cart by id`
* **URL**

  `/customer/cart/:id`

* **Method:**
  
   `PATCH`

* **Data Params**


  * **Endpoint ini akan menerima request params:**

    `id`

* **Data Body**
    ```
    quantity
    total
    ```
* **Success Response:**
  * **Code:** 200 <br />
  * **Response:** 
  ```JSON
   {
      
      "CartId" : 13,
      "ProductId ": 19,
      "quantity" : 1,
      "total": 20000,
       "updatedAt": "2020-11-19T08:31:09.111Z",
      "createdAt": "2020-11-19T08:31:09.111Z"
    
    }
  ```
 

* **Error Response:**


  get failed response because  data cart not found

  * **Code:** 404 Not Found  <br />
    **Content:** `{ message : "data not found" }`

  get failed because server error
    * **Code:** 500 Internal server error <br />

