# e-commerce-server


### Admin Endpoint

| method | routes | description |
|--------|--------|-------------|
| GET | /products | Menampilkan list product dalam bentuk array of object untuk user dengan role Admin |
| POST | /products | Menambah product baru |
| PUT | /products/:id | Mengupdate product berdasarkan id |
| DELETE | /products/:id | Menghapus product berdasarkan id |


### Customer Endpoint

| method | routes | description |
|--------|--------|-------------|
| GET | /cust/products | Menampilkan list product dalam bentuk array of object untuk user dengan role Customer |
| POST | /cust/addcart | Menambah cart baru berdasarkan UserId dan ProductId |
| GET | /cust/checkout | Menampilkan list cart dengan status 'paid' dalam bentuk array of object |
| PUT | /cust/checkout | Merubah status cart yang 'pending' menjadi 'paid' dan mengurangi stock Product berdasarkan qty di cart |
| GET | /cust/cart | Menampilkan list cart dengan status 'pending' dalam bentuk array of object |
| PATCH | /cust/cart/:id | Menambah / mengurangi qty dalam cart |
| DELETE | /cust/cart/:id | Menghapus cart dari cart list berdasarkan cart id |


### User Endpoint

| method | routes | description |
|--------|--------|-------------|
| POST | /login | Login Menggunakan Email & Password |
| POST | /register | Register Menggunakan Email & Password |

## GET /products
  Menampilkan list product dalam bentuk array of object untuk user dengan role Admin

* **URL**

  /products

* **Method:**

  `GET`

* **Header Params**

   `accessToken: 'eyJhbXXXXXXXX.ayaXXXX'`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
	```javascript
	[
    {
        "id": 2,
        "name": "Keripik Singkong",
        "image_url": "https://www.rumahmesin.com/wp-content/uploads/2016/05/cara-membuat-keripik-singkong-renyah-asin.png",
        "price": 30000,
        "stock": 10,
        "createdAt": "2020-11-11T07:30:47.334Z",
        "updatedAt": "2020-11-11T07:30:47.334Z"
    },
    {
        "id": 3,
        "name": "Keripik Singkong Spesial",
        "image_url": "https://www.rumahmesin.com/wp-content/uploads/2016/05/cara-membuat-keripik-singkong-renyah-asin.png",
        "price": 40000,
        "stock": 10,
        "createdAt": "2020-11-11T07:32:48.149Z",
        "updatedAt": "2020-11-11T07:32:48.149Z"
    }
  ]
	 ```

* **Error Response:**

  * **Code:** 403 FORBIDEN <br />
    **Content:** `{ msg : "You dont have access" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal Server Error." }`

* **Sample Call:**
  ```js
  axios({
        url : '/products',
        method : 'GET',
        headers : {access_token}
    })
  ```



## POST /products
  Menambah product  baru

* **URL**

  /products

* **Method:**

  `POST`
  
*  **Data Params**
   
    **Request body:**
   ```javascript
   {
   "name" : "string",
   "image_url" : "string",
   "price" : INT,
   "stock" : INT
   }
   ```
* **Header Params**

   `accessToken: 'eyJhbXXXXXXXX.ayaXXXX'`
      
* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    `{
    "id": 20,
    "name": "Sepatu Converse",
    "image_url": "https://s.kaskus.id/r480x480/images/fjb/2019/03/01/tmp_phpuop0mn_8337575_1551396108.jpg",
    "price": 100000,
    "stock": 10,
    "updatedAt": "2020-11-06T10:52:38.280Z",
    "createdAt": "2020-11-06T10:52:38.280Z"
    }`
   

 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Name required" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Image URL required" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Price must be a number" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Price cannot be negative value" }`

  OR

    * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Please fill all form" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Stock must be a number" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Stock cannot be negative value" }`

  OR

  * **Code:** 403 FORBIDEN <br />
    **Content:** `{ msg : "You dont have access" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal Server Error." }`

* **Sample Call:**
  ```js
  axios({
          url : '/products',
          method : 'POST',
          data : {
            name,
            image_url,
            price,
            stock
          },
          headers : {access_token}
        })
  ```


## PUT /products/:id
Mengupdate products berdasarkan parameter id

* **URL**

  /products/:id

* **Method:**

  `PUT`

*  **URL Params**

   **Required:**
 
   `id=[integer]`
        
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg : "Data Not Found" }` 


*  **Data Params**
   
    **Request body:**
   ```javascript
   {
   "name" : "string",
   "image_url" : "string",
   "price" : INT,
   "stock" : INT
   }
   ```

* **Header Params**

   `accessToken: 'eyJhbXXXXXXXX.ayaXXXX'`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
	```javascript
	{
    "id": 20,
    "name": "Sepatu Converse Edit",
    "image_url": "https://s.kaskus.id/r480x480/images/fjb/2019/03/01/tmp_phpuop0mn_8337575_1551396108.jpg",
    "price": 150000,
    "stock": 9,
    "updatedAt": "2020-11-06T10:52:38.280Z",
    "createdAt": "2020-11-06T10:52:38.280Z"
    }
	 ```

* **Error Response:**
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Name required" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Image URL required" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Price must be a number" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Price cannot be negative value" }`

  OR

    * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Please fill all form" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Stock must be a number" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Stock cannot be negative value" }`

  OR

  * **Code:** 403 FORBIDEN <br />
    **Content:** `{ msg : "You dont have access" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal Server Error." }`

* **Sample Call:**
  ```js
  axios({
          url : `/products/${id}`,
          method : 'PUT',
          data : {
            name,
            image_url,
            price,
            stock
          },
          headers : {access_token}
        })
  ```


## DELETE /products/:id
  Menghapus product list berdasarkan parameter id

* **URL**

  /products/:id

* **Method:**

  `DELETE`

*  **URL Params**

   **Required:**
 
   `id=[integer]`
        
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg : "Data Not Found" }` 


* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
	```javascript
	{
        "msg": "Product Deleted"
    }
	 ```

* **Header Params**

   `accessToken: 'eyJhbXXXXXXXX.ayaXXXX'`

* **Error Response:**

  * **Code:** 403 FORBIDEN <br />
    **Content:** `{ msg : "You dont have access" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal Server Error." }`

* **Sample Call:**
  ```js
  axios({
        url : `/products/${id}`,
        method : 'DELETE',
        headers : {access_token}
    })
  ```

## **POST /login**
---
  Mengembalikan JSON access_token, id, email, dan role setelah berhasil login.

* **URL**

  /login

* **Method:**

  `POST`

* **Success Response:**

  * **Code:** 200 **OK** <br />
    **Content:** 
    ```json
    {
    "access_token": "eyJhbGciOiJIUzzkxkzxkzlxklzklxxxxxxxxxxxxxxxxxxxxxxx",
    "id": 2,
    "email": "admin@admin.com",
    "role":"admin"
}
    ```
 
* **Error Response:**

  * **Code:** 401 **UNAUTHORIZED** <br />
    **Content:**`{ msg: "Invalid email or password"}`
  OR

  * **Code:** 401 **UNAUTHORIZED** <br />
    **Content:**`{ msg: "Email and Password cannot be empty"}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal Server Error." }`

* **Sample Call:**
  ```js
  axios({
        method: 'POST',
        url: '/login',
        data : {
            email,
            password
        }
    })
  ```


## **POST /register**
---
  Mengembalikan JSON email setelah berhasil register.

* **URL**

  /register

* **Method:**

  `POST`

* **Success Response:**

  * **Code:** 201 **CREATED** <br />
    **Content:** 
    ```json
    {
    "email": "admin@admin.com"
}
    ```
 
* **Error Response:**

  * **Code:** 400 **BAD REQUEST** <br />
    **Content:**`{ msg: "Email already exist"}`
  OR

  * **Code:** 400 **BAD REQUEST** <br />
    **Content:**`{ msg: "Check your email format"}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal Server Error." }`

* **Sample Call:**
  ```js
  axios({
        method: 'POST',
        url: '/register',
        data : {
            email,
            password
        }
    })
  ```

## GET /cust/products
  Menampilkan list product dalam bentuk array of object untuk user dengan role Customer

* **URL**

  /cust/products

* **Method:**

  `GET`

* **Header Params**

   `accessToken: 'eyJhbXXXXXXXX.ayaXXXX'`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
	```javascript
	[
    {
        "id": 2,
        "name": "Keripik Singkong",
        "image_url": "https://www.rumahmesin.com/wp-content/uploads/2016/05/cara-membuat-keripik-singkong-renyah-asin.png",
        "price": 30000,
        "stock": 10,
        "createdAt": "2020-11-11T07:30:47.334Z",
        "updatedAt": "2020-11-11T07:30:47.334Z"
    },
    {
        "id": 3,
        "name": "Keripik Singkong Spesial",
        "image_url": "https://www.rumahmesin.com/wp-content/uploads/2016/05/cara-membuat-keripik-singkong-renyah-asin.png",
        "price": 40000,
        "stock": 10,
        "createdAt": "2020-11-11T07:32:48.149Z",
        "updatedAt": "2020-11-11T07:32:48.149Z"
    }
  ]
	 ```

* **Error Response:**

  * **Code:** 403 FORBIDEN <br />
    **Content:** `{ msg : "You dont have access" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal Server Error." }`

* **Sample Call:**
  ```js
  axios({
        url : '/products',
        method : 'GET',
        headers : {access_token}
    })
  ```

