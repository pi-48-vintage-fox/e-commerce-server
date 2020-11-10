# E-Commerce Server 

###### 

## Api Documentation



#### :arrow_right: Endpoints

| **METHOD** | URI           | Request Headers                 | Request Body                                                 |
| ---------- | ------------- | ------------------------------- | ------------------------------------------------------------ |
| POST       | /login        |                                 | { email: **required** , password: **required** }             |
| POST       | /register     |                                 | { email: **required** , password: **required** }             |
| GET        | /products     |                                 | *none*                                                       |
| POST       | /products     | { access_token : **required**}  | { name : **required**, image_url : **required** , price: **required** , stock : **required** , descriptions : **required**} |
| PUT        | /products/:id | { access_token : **required** } | { name : **required**, image_url : **required** , price: **required** , stock : **required** , descriptions : **required**} |
| DELETE     | /products/:id | { access_token : **required**}  | *none*                                                       |



#### Login User

- ##### URI

  ```
  /login
  ```

- ##### Method

  ```
  POST
  ```

- ##### Request Body

  ```
  {
  	email : "admin@email.com",
  	password: "testing"
  }
  ```

- ##### Success Response

  - **Code** : 200

    - **Content** : 

      ```
      {
      	msg: "Login Success",
      	access_token: "access_token"
      }
      ```

- **Error Response** :

  - **Code** : 400 

    - Content : 

      ```
      {
      	msg : "Email/Password cannot be empty"
      }
      ```

  - **Code** : 401

    - Content: 

      ```
      {
      	msg : "Wrong Email/Password"
      }
      ```

#### Register User

- ##### URI

  ```
  /register
  ```

  

- ##### Method

  ```
  POST
  ```

- ##### Request Body

  ```
  {
  	email : "admin@email.com",
  	password: "testing"
  }
  ```

- ##### Success Response

  - **Code** : 200

    - **Content** : 

      ```
      {
      	msg: "User created"
      }
      ```
  
- **Error Response** :

  - **Code** : 400 

    - Content : 

      ```
      {
      	msg : "Email/Password cannot be empty"
      }
      ```

  - **Code** : 400

    - Content: 

      ```
      {
      	msg : "Wrong Email/Password"
      }
      ```

      
      
#### Get all Products

- ##### URI

  ```
  /products
  ```

- ##### Method

  ```
  GET
  ```

- ##### Request Body

  ```
  none
  ```
  
- ##### Success Response

  - **Code** : 200

    - **Content** : 

      ```
      {
      	msg: "Products fetched",
      	products: [
      		{
      			name: "Product1",
      			image_url:"http://someurl.com/image.jpg",
      			price: 1000,
      			stock: 10,
      			descriptions: "some description"
      		}
      		...
      	]
      }
      ```
  
- **Error Response** :

  - **Code** : 500 

    - Content : 

      ```
      {
      	msg : "Internal Server Error"
      }
      ```


#### Add Product

- ##### URI

  ```
  /products
  ```

- ##### Method

  ```
  POST
  ```

- ##### Request Body

  ```
  {
  	name: "Product1",
  	image_url:"http://someurl.com/image.jpg",
  	price: 1000,
  	stock: 10,
  	descriptions: "some description"
  }
  ```

- ##### Success Response

  - **Code** : 200

    - **Content** : 

      ```
      {
      	msg: "Product Added",
      	product:{
      		id:1,
      		name: "Product1",
      		image_url:"http://someurl.com/image.jpg",
      		price: 1000,
      		stock: 10,
      		descriptions: "some description",
      		createdAt : 2020-11-10 09:04:28,
      		updatedAt : 2020-11-10 09:04:28
      	}
      }
      ```
  
- **Error Response** :

  - **Code** : 400 

    - Content : 

      ```
      {
      	msg : ["Name is Required","Image Url is required" ...]
      }
      ```

  - **Code** : 500

    - Content: 

      ```
      {
      	msg : "Internal Server Error"
      }
      ```

#### Update Product

- ##### URI

  ```
  /products/:id
  ```

- ##### Method

  ```
  PUT
  ```

- **Request Headers**

  ```
  {
  	access_token : "access_token"
  }
  ```

- ##### Request Body

  ```
  {
  	name: "Product1",
  	image_url:"http://someurl.com/image.jpg",
  	price: 1000,
  	stock: 10,
  	descriptions: "some description"
  }
  ```

- ##### Success Response

  - **Code** : 200

    - **Content** : 

      ```
      {
      	msg: "Product Updated",
      	product:{
      		id: 1,
      		name: "Product1",
      		image_url:"http://someurl.com/image.jpg",
      		price: 1000,
      		stock: 10,
      		descriptions: "some description",
      		createdAt : 2020-11-10 09:04:28,
      		updatedAt : 2020-11-10 09:04:28
      	}
      }
      ```
  
- **Error Response** :

  - **Code** : 400 

    - Content : 

      ```
      {
      	msg : ["Price must be greater than 0","Stock must be greater than 0" ...]
      }
      ```

  - **Code** : 500

    - Content: 

      ```
      {
      	msg : "Internal Server Error"
      }
      ```
    
  - **Code** : 401
  
    - Content: 
  
      ```
      {
      	msg : "Not Authorized"
      }
      ```
  
      

#### Delete Product

- ##### URI

  ```
  /register
  ```

- ##### Method

  ```
  DELETE
  ```

- **Request Headers**

  ```
  {
  	access_token : "access_token"
  }
  ```

- ##### Request Body

  ```
  none
  ```
  
- ##### Success Response

  - **Code** : 200

    - **Content** : 

      ```
      {
      	msg: "Product deleted",
      	product:{
      		id: 1,
      		name: "Product1",
      		image_url:"http://someurl.com/image.jpg",
      		price: 1000,
      		stock: 10,
      		descriptions: "some description",
      		createdAt : 2020-11-10 09:04:28,
      		updatedAt : 2020-11-10 09:04:28
      	}
      }
      ```
  
- **Error Response** :

  - **Code** : 500 

    - Content : 

      ```
      {
      	msg : "Internal Server Error"
      }
      ```

  - **Code** : 401

    - Content: 

      ```
      {
      	msg : "Not Authorized"
      }
      ```
      
      
