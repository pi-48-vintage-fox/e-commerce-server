# e-commerce-server
--------------------------
USER ROUTER
--------------------------
* **URL**

  `/users/login`

* **Description** <br />
`LOGIN USER`

* **Method:**
  
  `POST`

*  **URL Params**

   `none`

   **Required:**
 
   `none`

   **Optional:**
 
   `none`

* **Data Params**

  `request body`

    | Key       | Type | Description|Validation|
    |-----------|------|------------|----------|
    |password   |string|REQUIRED    |-
    |email      |string|REQUIRED    |unique
   

* **Success Response:**<br />
    `IF PAYLOAD SUITS VALIDATION RULE`
  * **Code:** 200 OK <br />
    **Content:** <br />
    ```javascript
    {
        "access_token": string,
        "name": string,
        "role":string
    }
    ```
 
* **Error Response:**

  `IF VALIDATION FAILS`

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "VALIDATION FAILS" }`

  OR

  * **Code:** 500 Internal Server Error <br />
    

* **Sample Call:**

  `none`

* **Notes:**

  `none`
--------------------------
--------------------------
* **URL**

  `/users/register`

* **Description** <br />
`REGISTER USER`

* **Method:**
  
  `POST`

*  **URL Params**

   `none`

   **Required:**
 
   `none`

   **Optional:**
 
   `none`

* **Data Params**

  `request body`

    | Key       | Type | Description|Validation|
    |-----------|------|------------|----------|
    |password   |string|REQUIRED    |-
    |email      |string|REQUIRED    |unique
   

* **Success Response:**<br />
    `IF PAYLOAD SUITS VALIDATION RULE`
  * **Code:** 200 OK <br />
    **Content:** <br />
    ```javascript
    {
        "access_token": string,
        "name": string,
        "role":string
    }
    ```
 
* **Error Response:**

  `IF VALIDATION FAILS`

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "VALIDATION FAILS" }`

  OR

  * **Code:** 500 Internal Server Error <br />
    

* **Sample Call:**

  `none`

* **Notes:**

  `none`
--------------------------
PRODUCT ROUTER
--------------------------
* **URL**

  `/products/addproduct`

* **Description** <br />
`create product`

* **Method:**
  
  `POST`

*  **Headers**

   `accesstoken: string`


*  **URL Params**

   `none`

   **Required:**
 
   `none`

   **Optional:**
 
   `none`

* **Data Params**

  `request body`

    | Key       | Type | Description|Validation|
    |-----------|------|------------|----------|
    |name       |string|REQUIRED    |-
    |image_url  |string|REQUIRED    |
    |price      |double|REQUIRED    |
    |stock      |integer|REQUIRED   |
   

* **Success Response:**<br />
    `IF PAYLOAD SUITS VALIDATION RULE`
  * **Code:** 201 OK <br />
    **Content:** <br />
    ```javascript
    {
        "id":integer,
        "name": string,
        "image_url": string,
        "price": double,
        "stock":integer,
        "updatedAt": timestamps,
        "createdAt": timestamps
    }
    ```
 
* **Error Response:**

  `IF VALIDATION FAILS`

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "VALIDATION FAILS" }`

  OR

  * **Code:** 500 Internal Server Error <br />
    

* **Sample Call:**

  `none`

* **Notes:**

  `none`
--------------------------
--------------------------
* **URL**

  `/products/:id`

* **Description** <br />
`update product`

* **Method:**
  
  `PUT`

*  **Headers**

   `accesstoken: string`


*  **URL Params**

   `none`

   **Required:**
 
   `none`

   **Optional:**
 
   `none`

* **Data Params**

  `request body`

    | Key       | Type | Description|Validation|
    |-----------|------|------------|----------|
    |name       |string|REQUIRED    |-
    |image_url  |string|REQUIRED    |
    |price      |double|REQUIRED    |
    |stock      |integer|REQUIRED   |
   

* **Success Response:**<br />
    `IF PAYLOAD SUITS VALIDATION RULE`
  * **Code:** 200 OK <br />
    **Content:** <br />
    ```javascript
    {
        "id":integer,
        "name": string,
        "image_url": string,
        "price": double,
        "stock":integer,
        "updatedAt": timestamps,
        "createdAt": timestamps
    }
    ```
 
* **Error Response:**

  `IF VALIDATION FAILS`

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "VALIDATION FAILS" }`

  OR

  * **Code:** 500 Internal Server Error <br />
    

* **Sample Call:**

  `none`

* **Notes:**

  `none`
--------------------------
--------------------------
* **URL**

  `/products/:id`

* **Description** <br />
`delete product`

* **Method:**
  
  `DELETE`

*  **Headers**

   `accesstoken: string`


*  **URL Params**

   `none`

   **Required:**
 
   `none`

   **Optional:**
 
   `none`

* **Data Params**
  `none`

* **Success Response:**<br />
    `IF PAYLOAD SUITS VALIDATION RULE`
  * **Code:** 200 OK <br />
    **Content:** <br />
    ```javascript
    {
         "msg": "Product sucessfully deleted "
    }
    ```
 
* **Error Response:**

  `IF VALIDATION FAILS`

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `"msg": "Ensure your product detail is correct"`

  OR

  * **Code:** 500 Internal Server Error <br />
    

* **Sample Call:**

  `none`

* **Notes:**

  `none`
--------------------------
--------------------------
* **URL**

  `/products/`

* **Description** <br />
`read all product`

* **Method:**
  
  `GET`

*  **Headers**

   `accesstoken: string`

*  **URL Params**

   `none`

   **Required:**
 
   `none`

   **Optional:**
 
   `none`

* **Data Params**
  `none`

* **Success Response:**<br />
    `IF PAYLOAD SUITS VALIDATION RULE`
  * **Code:** 200 OK <br />
    **Content:** <br />
    ```javascript
    {
        "id":integer,
        "name": string,
        "image_url": string,
        "price": double,
        "stock":integer,
        "updatedAt": timestamps,
        "createdAt": timestamps
    }
    ```
 
* **Error Response:**

  `IF VALIDATION FAILS`

  * **Code:** 400 BAD REQUEST <br />
    **Content:** ``{ error : "VALIDATION FAILS" }``

  OR

  * **Code:** 500 Internal Server Error <br />
    

* **Sample Call:**

  `none`

* **Notes:**

  `none`
--------------------------
--------------------------
* **URL**

  `/products/filter/:id`

* **Description** <br />
`filter product by id`

* **Method:**
  
  `GET`

*  **Headers**

   `accesstoken: string`

*  **URL Params**

   `none`

   **Required:**
 
   `none`

   **Optional:**
 
   `none`

* **Data Params**
  `none`

* **Success Response:**<br />
    `IF PAYLOAD SUITS VALIDATION RULE`
  * **Code:** 200 OK <br />
    **Content:** <br />
    ```javascript
    {
        "id":integer,
        "name": string,
        "image_url": string,
        "price": double,
        "stock":integer,
        "updatedAt": timestamps,
        "createdAt": timestamps
    }
    ```
 
* **Error Response:**

  `IF VALIDATION FAILS`

  * **Code:** 400 BAD REQUEST <br />
    **Content:** ``{ error : "VALIDATION FAILS" }``

  OR

  * **Code:** 500 Internal Server Error <br />
    

* **Sample Call:**

  `none`

* **Notes:**

  `none`
--------------------------
--------------------------
* **URL**

  `products/addToCart/:id`

* **Description** <br />
`add product to cart by user`

* **Method:**
  
  `POST`

*  **Headers**

   `accesstoken: string`

*  **URL Params**

   `none`

   **Required:**
 
   `none`

   **Optional:**
 
   `none`

* **Data Params**

  `request body`

    | Key       | Type | Description|Validation|
    |-----------|------|------------|----------|
    |price      |double|REQUIRED    |
    |quantity   |integer|REQUIRED   |
   

* **Success Response:**<br />
    `IF PAYLOAD SUITS VALIDATION RULE`
  * **Code:** 200 OK <br />
    **Content:** <br />
    ```javascript
    {
      "cart": {
          "ProductId": integer,
          "UserId": integer,
          "quantity": integer,
          "price": integer,
          "status":string,
          "totalPrice": integer
      }
    }
    ```
 
* **Error Response:**

  `IF VALIDATION FAILS`

  * **Code:** 400 BAD REQUEST <br />
    **Content:** ``{ error : "VALIDATION FAILS" }``

  OR

  * **Code:** 500 Internal Server Error <br />
    

* **Sample Call:**

  `none`

* **Notes:**

  `none`
--------------------------
--------------------------
* **URL**

  `products/cart`

* **Description** <br />
`add product to cart by user`

* **Method:**
  
  `GET`

*  **Headers**

   `accesstoken: string`

*  **URL Params**

   `none`

   **Required:**
 
   `none`

   **Optional:**
 
   `none`

* **Data Params**
  `none`
* **Success Response:**<br />
    `IF PAYLOAD SUITS VALIDATION RULE`
  * **Code:** 200 OK <br />
    **Content:** <br />
    ```javascript
    {
        "showCart": [
          {
            "id": integer,
            "name": string,
            "image_url":string,
            "price": double,
            "stock": integer,
            "UserId": integer,
            "Cart": {
                "ProductId": integer,
                "UserId": integer,
                "quantity": integer,
                "price": integer,
                "totalPrice": integer,
                "status": string,
            }
          }
        ]
    }
    ```
 
* **Error Response:**

  `IF VALIDATION FAILS`

  * **Code:** 400 BAD REQUEST <br />
    **Content:** ``{ error : "VALIDATION FAILS" }``

  OR

  * **Code:** 500 Internal Server Error <br />
    

* **Sample Call:**

  `none`

* **Notes:**

  `none`
--------------------------