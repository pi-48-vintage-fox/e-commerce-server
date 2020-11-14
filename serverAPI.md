# e-commercer0-server

**e-commercer0-server**

----

```
 Manage All about products dan user
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

    `Update All data todo by id`
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

  get failed response because  data todo not found

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


  get failed response because  data todo not found

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

