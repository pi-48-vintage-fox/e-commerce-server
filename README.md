# e-commerce-server

| Method | Routes       | Description                      |
|--------|--------------|----------------------------------|
| GET    | /products    | Show list product                |
| POST   | /login       | Login user to access application |
| POST   | /register    | Login user to access application |
| POST   | /products    | Add new product                  |
| PUT    | /products/:id| Edit data product with Id        |
| DELETE | /products/:id| Delete product with Id           |
| GET    | /carts       | Show list carts                  |
| POST   | /carts       | Add new carts                    |
| PATCH  | /carts/:id   | Update new quantity cart         |
| GET    | /carts/:id   | Show cart by id                  |
| DELETE | /carts/:id   | Delete product with Id           |


#

## POST /login

Login atau masuk ke halaman web home

* **URL**

  /login

* **Method:**

  `POST`
 

* **Data Params**

  ```
  email:[string],
  password:[string]
  ```

* **Header Params:**
  ```
  -
  ```

* **Success Response:**

  * **Code:** 
  ``` 
  200 OK
  ```
  *  **Content:** 
    ```
    {
      id: 1,
      email: 'admin@mail.com
    }
    ```
 
* **Error Response:**

  *  **Code:** 
  ```
  400 BadRequest
  ```
  * **Content:**  
  ```
  {
    message: "Wrong Email/password"
  }
  ```

  OR

  * **Code:** 
  ```
  400 BadRequest
  ```
  * **Content:**  
  ```
  {
    message: "Please required Email and password"
  }
  ```

  OR
  
  * **Code:** 
  ```
  500 InternalServerError
  ```
  * **Content:** 
  ```
  {
    message: "Internal server error"
  }  
  ```

  #

## POST /register

Daftar account untuk login ke dalam web application

* **URL**

  /register

* **Method:**

  `POST`
 

* **Data Params**

  ```
  email:[string],
  password:[string]
  ```

* **Header Params:**
  ```
  -
  ```

* **Success Response:**

  * **Code:** 
  ``` 
  200 OK
  ```
  *  **Content:** 
    ```
    {
      id: 2,
      email: 'yaya@mail.com
    }
    ```
 
* **Error Response:**

  *  **Code:** 
  ```
  400 BadRequest
  ```
  * **Content:**  
  ```
  {
    message: "Wrong Email/password"
  }
  ```

  OR

  * **Code:** 
  ```
  400 BadRequest
  ```
  * **Content:**  
  ```
  {
    message: "Please required Email and password"
  }
  ```

  OR
  
  * **Code:** 
  ```
  500 InternalServerError
  ```
  * **Content:** 
  ```
  {
    message: "Internal server error"
  }  
  ```

 # 

## POST /product

Menambah produk baru ke dalam database

* **URL**

  /product

* **Method:**

  `POST`
 

* **Data Params**

  ```
  name:[string],
  image_url:[string]
  price:[integer],
  stock:[integer]
  ```

* **Header Params:**
  ```
  access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkXXXXXXXXXXXXXXXXX
  ```

* **Success Response:**

  * **Code:** 
  ``` 
  201 Created
  ```
  *  **Content:** 
    ```
    {
      id: 1,
      name:  'Oronamin C',
      image_url: 'https://www.google.com/aclk?sa=l&ai=DChcSEwj4hcrWjvnsAhUJ3EwCHf4vBEoYABAOGgJ0bQ&sig=AOD64_22WSGC5bniQcaFwI5viyjFO4lfDg&adurl&ctype=5&ved=2ahUKEwie477WjvnsAhWkU3wKHXfzDagQvhd6BAgBEEY'
      price: 8000,
      stock: 300
    }
    ```
 
* **Error Response:**

  * **Code:** 
  ```
  400 BadRequest
  ```
  * **Content:**  
  ```
  {
    message: "Wrong Email/password"
  }
  ```

  OR

  * **Code:** 
  ```
  400 BadRequest
  ```
  * **Content:**  
  ```
  {
    message: "Field Cannot be empty!"
  }
  ```

  OR
  
  * **Code:** 
  ```
  400 BadRequest
  ```
  * **Content:** 
  ```
  {
    message: "Price or stock must be more than 0"
  }
  ```

  OR
  
  * **Code:** 
  ```
  400 BadRequest
  ```
  * **Content:**  
  ```
  {
    message: "Incorret data type (string/number)"
  }
  ```

  OR
  
  * **Code:** 
  ```
  400 BadRequest
  ```
  * **Content:** 
  ```
  {
    message: "You don't have authorization to access"
  }
  ```

  OR
  
  * **Code:** 
  ```
  500 InternalServerError
  ```
  * **Content:** 
  ```
  {
    message: "Internal server error"
  }  
  ```


# 

## PUT /product

Mengupdate data product

* **URL**

  /product/:id

* **Method:**

  `PUT`

* **URL Params**

  **Required:**
  ```
  Id: [integer]
  ```
 
* **Data Params**

  ```
  name:[string],
  image_url:[string]
  price:[integer],
  stock:[integer]
  ```

* **Header Params:**
  ```
  access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkXXXXXXXXXXXXXXXXX
  ```

* **Success Response:**

  * **Code:** 
  ``` 
  200 OK
  ```
  *  **Content:** 

   ```
    {
      name: 'Oronamin-C',
      image_url: 
      price: 8000,
      stock: 300
    }
    ```

* **Error Response:**

  * **Code:** 
  ```
  400 BadRequest
  ```
  * **Content:**  
  ```
  {
    message: "Wrong Email/password"
  }
  ```

  OR

  * **Code:** 
  ```
  400 BadRequest
  ```
  * **Content:**  
  ```
  {
    message: "Field Cannot be empty!"
  }
  ```

  OR
  
  * **Code:** 
  ```
  400 BadRequest
  ```
  * **Content:** 
  ```
  {
    message: "Price or stock must be more than 0"
  }
  ```

  OR
  
  * **Code:** 
  ```
  400 BadRequest
  ```
  * **Content:**  
  ```
  {
    message: "Incorret data type (string/number)"
  }
  ```

  OR
  
  * **Code:** 
  ```
  400 BadRequest
  ```
  * **Content:** 
  ```
  {
    message: "You don't have authorization to access"
  }
  ```

  OR
  
  * **Code:** 
  ```
  500 InternalServerError
  ```
  * **Content:** 
  ```
  {
    message: "Internal server error"
  }  
  ```


#

## DELETE /product/:id

  Menghapus product berdasarkan Id

* **URL**

  /product/:id

* **Method:**

  `DELETE`
 
* **URL Params**

  **Required:**
  ```
  Id: [integer]
  ```

* **Data Params**

  ```
  -
  ```

* **Header Params:**
  ```
  access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkXXXXXXXXXXXXXXXXX
  ```

* **Success Response:**

  * **Code:** 
  ``` 
  200 OK
  ```
  *  **Content:** 
    ```
    {
      message: "Success delete product"
    }
    ```
 
* **Error Response:**

  *  **Code:** 
  ```
  400 BadRequest
  ```
  * **Content:**  
  ```
  {
    message: "You dont't have authorization"
  }
  ```

  OR
  
  * **Code:** 
  ```
  500 InternalServerError
  ```
  * **Content:** 
  ```
  {
    message: "Internal server error"
  }  
  ```

  #

## GET /carts

Menampilkan semua list cart

* **URL**

  /carts

* **Method:**

  `GET`
 

* **Data Params**

  ```
  -
  ```

* **Header Params:**
  ```
  access_token: erwur3r23r32xxxxxxxxxxxxxxxxxxxxxxxx
  ```

* **Success Response:**

  * **Code:** 
  ``` 
  200 OK
  ```
  *  **Content:** 
    ```
    [
      {
        "id": 18,
        "UserId": 2,
        "ProductId": 1,
        "quantity": 22,
        "status": true,
        "createdAt": "2020-11-19T00:52:46.807Z",
        "updatedAt": "2020-11-19T01:18:02.942Z",
        "Product": {
            "id": 1,
            "name": "iPhone 12 Pro",
            "image_url": "https://cd.dxomark.com/blue-hero.jpg",
            "price": 20000000,
            "stock": 300,
            "createdAt": "2020-11-18T19:04:07.373Z",
            "updatedAt": "2020-11-18T19:04:07.373Z"
        } 
      },
    ]
    ```
 
* **Error Response:**
  
  * **Code:** 
  ```
  500 InternalServerError
  ```
  * **Content:** 
  ```
  {
    message: "Internal server error"
  }

#

## PATCH /carts

Menghapus daftar cart berdasarkan id

* **URL**

  /carts/:id

* **Method:**

  `PATCH`
 

* **Data Params**

  ```
  quantity: [integer]
  ```

* **Header Params:**
  ```
  access_token: erwur3r23r32xxxxxxxxxxxxxxxxxxxxxxxx
  ```

* **Success Response:**

  * **Code:** 
  ``` 
  200 OK
  ```
  *  **Content:** 
    ```
    {
      message: 'Success update quantity.'
    }
    ```
 
* **Error Response:**
  
  *  **Code:** 
  ```
  400 BadRequest
  ```
  * **Content:**  
  ```
  {
    message: "You dont't have authorization"
  }
  ```

  OR

  * **Code:** 
  ```
  500 InternalServerError
  ```
  * **Content:** 
  ```
  {
    message: "Internal server error"
  }  
  ```

#

## GET /carts

Menampilkan carts berdasarkan id dari product

* **URL**

  /carts/:id

* **Method:**

  `GET`
 

* **Data Params**

  ```
  -
  ```

* **Header Params:**
  ```
  access_token: erwur3r23r32xxxxxxxxxxxxxxxxxxxxxxxx
  ```

* **Success Response:**

  * **Code:** 
  ``` 
  200 OK
  ```
  *  **Content:** 
    ```
    [
      {
        "id": 18,
        "UserId": 2,
        "ProductId": 1,
        "quantity": 22,
        "status": true,
        "createdAt": "2020-11-19T00:52:46.807Z",
        "updatedAt": "2020-11-19T01:18:02.942Z",
        "Product": {
            "id": 1,
            "name": "iPhone 12 Pro",
            "image_url": "https://cd.dxomark.com/blue-hero.jpg",
            "price": 20000000,
            "stock": 300,
            "createdAt": "2020-11-18T19:04:07.373Z",
            "updatedAt": "2020-11-18T19:04:07.373Z"
        } 
      },
    ]
    ```
 
* **Error Response:**
  
  * **Code:** 
  ```
  500 InternalServerError
  ```
  * **Content:** 
  ```
  {
    message: "Internal server error"
  }  
  ```

#

## DELETE /carts

Menghapus daftar cart berdasarkan id

* **URL**

  /carts/:id

* **Method:**

  `DELETE`
 

* **Data Params**

  ```
  -
  ```

* **Header Params:**
  ```
  access_token: erwur3r23r32xxxxxxxxxxxxxxxxxxxxxxxx
  ```

* **Success Response:**

  * **Code:** 
  ``` 
  200 OK
  ```
  *  **Content:** 
    ```
    {
      message: 'Item has been deleted form the cart.'
    }
    ```
 
* **Error Response:**
  
  *  **Code:** 
  ```
  400 BadRequest
  ```
  * **Content:**  
  ```
  {
    message: "You dont't have authorization"
  }
  ```

  OR

  * **Code:** 
  ```
  500 InternalServerError
  ```
  * **Content:** 
  ```
  {
    message: "Internal server error"
  }  
  ```  