# e-commerce-server

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
    
    /product

-   **Method:**
    
    `GET`
    
-   **Success Response:**
    
    -   **Code:**  200   **Content:**   `[{id: 1, name: 'Converse Chuck Taylor', image_url: 'http://imageexample.com', price: 600000, stock: 10}] (array of objects)`
    
-   **Error Response:**
    
    -   **Code:**  500  **Content:**  `{ error : "Internal Server Error" }`



## **Add Product**

    Add product to list

-   **URL**
    
    /product

    
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
    
    -   **Code:**  201   **Content:**   `{id: 1, name: 'Converse Chuck Taylor', image_url: 'http://imageexample.com', price: 600000, stock: 10}`
    
-   **Error Response:**

   -   **Code:**  400  **Content:**  `{ error : "Bad Request" }`

    -   **Code:**  401  **Content:**  `{ error : "User unauthorized" }`
    
    -   **Code:**  500  **Content:**  `{ error : "Internal Server Error" }`
 


## **Edit Product**

    Edit product from list

-   **URL**
    
    /product/:id

    
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
    
    -   **Code:**  201   **Content:**   `{msg: 'Sucessfully update product'}`
    
-   **Error Response:**

    -   **Code:**  400  **Content:**  `{ error : "Bad       Request" }`

    -   **Code:**  401  **Content:**  `{ error : "User unauthorized" }`

    -   **Code:**  404  **Content:**  `{ error : "Not Found" }`
    
    -   **Code:**  500  **Content:**  `{ error : "Internal Server Error" }`
 

## **Change Product's Stock**

    Edit product stock from list

-   **URL**
    
    /product/:id

    
- **URL Params**

	**Required:**

		`id=[integer]`
    
-   **Method:**
    
     `PATCH`  


   **Data Params**
    
    {
      stock: Integer
    }
    
-   **Success Response:**
    
    -   **Code:**  201   **Content:**   `{msg: 'Sucessfully update stock'}`
    
-   **Error Response:**

    -   **Code:**  400  **Content:**  `{ error : "Bad       Request" }`

    -   **Code:**  401  **Content:**  `{ error : "User unauthorized" }`

    -   **Code:**  404  **Content:**  `{ error : "Not Found" }`
    
    -   **Code:**  500  **Content:**  `{ error : "Internal Server Error" }`
 

## **Delete Product**

    Delete product from list

-   **URL**
    
    /product/:id

    
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
