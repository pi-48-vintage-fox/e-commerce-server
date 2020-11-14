# e-commerce-server

## **Register Admin**

    Administrator register

-   **URL**
    
    /admin/register
    
-   **Method:**
    
    `POST`

   **Data Params**
    
    {
      email: String,
      password: String
    }
    
-   **Success Response:**
    
    Return data from Task list
    
    -   **Code:**  201  **Content:**  `{id: 1, email: admin@mail.com}`
        
-   **Error Response:**
    
    -   **Code:**  500  **Content:**  `{ error : "Internal Server Error" }`



## **Login Admin**

    Administrator log in

-   **URL**
    
    /admin/login
    
-   **Method:**
    
    `POST`

   **Data Params**
    
    {
      email: String,
      password: String
    }
    
-   **Success Response:**
    
    Return data from Task list
    
    -   **Code:**  200  **Content:**  `{access_token: "dfvyhvjoob4567g"}`
        
-   **Error Response:**

    -   **Code:**  401  **Content:**  `{ error : "Wrong email/password" }`
    
    -   **Code:**  500  **Content:**  `{ error : "Internal Server Error" }`



## **Show All Products**

    Show all products

-   **URL**
    
    /products

-   **Method:**
    
    `GET`
    
-   **Success Response:**
    
    -   **Code:**  200   **Content:**   `[{id: 1, name: 'Philodendron Monstera Deliciousa', image_url: 'http://imageexample.com', price: 115000, stock: 10}] (array of objects)`
    
-   **Error Response:**
    
    -   **Code:**  500  **Content:**  `{ error : "Internal Server Error" }`



## **Add Product**

    Add product to list

-   **URL**
    
    /products

    
-   **Method:**
    
    `POST`


   **Data Params**
    
    {
      name: String,
      image_url: String,
      price: Integer,
      stock: Integer
    }
    
-   **Success Response:**
    
    -   **Code:**  201   **Content:**   `{id: 1, name: 'Philodendron Monstera Deliciousa', image_url: 'http://imageexample.com', price: 115000, stock: 10}`
    
-   **Error Response:**

   -   **Code:**  400  **Content:**  `{ error : "Bad Request" }`

    -   **Code:**  401  **Content:**  `{ error : "User unauthorized" }`
    
    -   **Code:**  500  **Content:**  `{ error : "Internal Server Error" }`
 


## **Edit Product**

    Edit product from list

-   **URL**
    
    /products/:id

    
- **URL Params**

	**Required:**

		`id=[integer]`
    
-   **Method:**
    
     `PUT`  


   **Data Params**
    
    {
      name: String,
      image_url: String,
      price: Integer,
      stock: Integer
    }
    
-   **Success Response:**
    
    -   **Code:**  200   **Content:**   `{msg: 'Sucessfully update product'}`
    
-   **Error Response:**

    -   **Code:**  400  **Content:**  `{ error : "Bad Request" }`

    -   **Code:**  401  **Content:**  `{ error : "User unauthorized" }`

    -   **Code:**  404  **Content:**  `{ error : "Not Found" }`
    
    -   **Code:**  500  **Content:**  `{ error : "Internal Server Error" }`

 

## **Delete Product**

    Delete product from list

-   **URL**
    
    /products/:id

    
- **URL Params**

	**Required:**

		`id=[integer]`
    
-   **Method:**
    
     `DELETE`  

    
-   **Success Response:**
    
    -   **Code:**  200   **Content:**   `{msg: 'Sucessfully delete product'}`
    
-   **Error Response:**

    -   **Code:**  401  **Content:**  `{ error : "User unauthorized" }`

    -   **Code:**  404  **Content:**  `{ error : "Not Found" }`
    
    -   **Code:**  500  **Content:**  `{ error : "Internal Server Error" }`


## **Show All Banners**

    Show all banners

-   **URL**
    
    /banners

-   **Method:**
    
    `GET`
    
-   **Success Response:**
    
    -   **Code:**  200   **Content:**   `[{id: 1, title: 'Green Go, image_url: 'http://imageexample.com', status: 'inactive'}] (array of objects)`
    
-   **Error Response:**
    
    -   **Code:**  500  **Content:**  `{ error : "Internal Server Error" }`


## **Add Banner**

    Add banner to list

-   **URL**
    
    /banners

    
-   **Method:**
    
    `POST`


   **Data Params**
    
    {
      title: String,
      image_url: String,
      status: String
    }
    
-   **Success Response:**
    
    -   **Code:**  201   **Content:**   `{id: 1, title: 'Green Go, image_url: 'http://imageexample.com', status: 'inactive'}`
    
-   **Error Response:**

    -   **Code:**  400  **Content:**  `{ error : "Bad Request" }`

    -   **Code:**  401  **Content:**  `{ error : "User unauthorized" }`
    
    -   **Code:**  500  **Content:**  `{ error : "Internal Server Error" }`
 

## **Edit Banner**

    Edit banner from list

-   **URL**
    
    /banners/:id

    
- **URL Params**

	**Required:**

		`id=[integer]`
    
-   **Method:**
    
     `PUT`  


   **Data Params**
    
    {
      title: String,
      image_url: String,
      status: String
    }
    
-   **Success Response:**
    
    -   **Code:**  200   **Content:**   `{msg: 'Sucessfully update banner'}`
    
-   **Error Response:**

    -   **Code:**  400  **Content:**  `{ error : "Bad Request" }`

    -   **Code:**  401  **Content:**  `{ error : "User unauthorized" }`

    -   **Code:**  404  **Content:**  `{ error : "Not Found" }`
    
    -   **Code:**  500  **Content:**  `{ error : "Internal Server Error" }`


## **Change Status Banner**

    Edit status banner from list

-   **URL**
    
    /banners/:id

    
- **URL Params**

	**Required:**

		`id=[integer]`
    
-   **Method:**
    
     `PATCH`  


   **Data Params**
    
    {
      status: String
    }
    
-   **Success Response:**
    
    -   **Code:**  200   **Content:**   `{msg: 'Sucessfully update banner'}`
    
-   **Error Response:**

    -   **Code:**  400  **Content:**  `{ error : "Bad Request" }`

    -   **Code:**  401  **Content:**  `{ error : "User unauthorized" }`

    -   **Code:**  404  **Content:**  `{ error : "Not Found" }`
    
    -   **Code:**  500  **Content:**  `{ error : "Internal Server Error" }`


## **Delete Banner**

    Delete banner from list

-   **URL**
    
    /banners/:id

    
- **URL Params**

	**Required:**

		`id=[integer]`
    
-   **Method:**
    
     `DELETE`  

    
-   **Success Response:**
    
    -   **Code:**  200   **Content:**   `{msg: 'Sucessfully delete banner'}`
    
-   **Error Response:**

    -   **Code:**  401  **Content:**  `{ error : "User unauthorized" }`

    -   **Code:**  404  **Content:**  `{ error : "Not Found" }`
    
    -   **Code:**  500  **Content:**  `{ error : "Internal Server Error" }`