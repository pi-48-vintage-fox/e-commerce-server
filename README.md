# e-commerce-server

| Method | Routes       | Description                      |
|--------|--------------|----------------------------------|
| GET    | /product     | Show list product                |
| POST   | /login       | login user to access application |
| POST   | /product     | add new product                  |
| PUT    | /product/:id | Edit data product with Id        |
| DELETE | /product/:id | Delete product with Id           |


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
    message: "Wrong Email/password"
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