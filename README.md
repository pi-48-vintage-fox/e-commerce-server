# e-commerce-server

**REGISTER ADMIN**
----
  Register admin account

* **URL**

  /adminRegister

* **Method:**

  `POST`

* **Data Params**

  **Required:**
   `first_name=[string]`
   `last_name=[string]`
   `gender=[string]`
   `email=[string]`
   `password=[string]`

* **Success Response:**

  * **Code:** 201 (Created) <br />
    **Content:** { 
        id,
        first_name,
        last_name,
        gender,
        email,
        role
    }
 
* **Error Response:**

  * **Code:** 400 (Bad request) <br />
    **Content:** [
        {
            message: <content.key> required
        }
    ]


**REGISTER CUSTOMER**
----
  Register customer account

* **URL**

  /customerRegister

* **Method:**

  `POST`

* **Data Params**

  **Required:**
   `first_name=[string]`
   `last_name=[string]`
   `gender=[string]`
   `email=[string]`
   `password=[string]`

* **Success Response:**

  * **Code:** 201 (Created) <br />
    **Content:** { 
        id,
        first_name,
        last_name,
        gender,
        email,
        role
    }
 
* **Error Response:**

  * **Code:** 400 (Bad request) <br />
    **Content:** [
        {
            message: <content.key> required
        }
    ]


**LOGIN ADMIN**
----
  Login into admin account

* **URL**

  /adminLogin

* **Method:**

  `POST`

* **Data Params**

  **Required:**
 
   `email=[string]`
   `password=[string]`

* **Success Response:**

  * **Code:** 200 (Ok) <br />
    **Content:** { 
        id,
        email
    }
 
* **Error Response:**

  * **Code:** 401 (Unauthorized) <br />
    **Content:** [
        {
            message: 'Email/password incorrect'
        }
    ]

  * **Code:** 500 (Internal server error) <br />
    **Content:** [
        {
            message: Internal Server Error
        }
    ]


**LOGIN CUSTOMER**
----
  Login into customer account

* **URL**

  /customerLogin

* **Method:**

  `POST`

* **Data Params**

  **Required:**
 
   `email=[string]`
   `password=[string]`

* **Success Response:**

  * **Code:** 200 (Ok) <br />
    **Content:** { 
        id,
        email
    }
 
* **Error Response:**

  * **Code:** 401 (Unauthorized) <br />
    **Content:** [
        {
            message: 'Email/password incorrect'
        }
    ]

  * **Code:** 500 (Internal server error) <br />
    **Content:** [
        {
            message: Internal Server Error
        }
    ]


**GET PRODUCTS**
----
  Get all products

* **URL**

  /products

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 (Ok) <br />
    **Content:** [
      {
        id,
        name,
        image_url,
        price,
        stock,
        CategoryId
      }
    ]
 
* **Error Response:**

  * **Code:** 401 (Unauthorized) <br />
    **Content:** [
        {
            message: 'User Unauthorized'
        }
    ]

  * **Code:** 500 (Internal server error) <br />
    **Content:** [
        {
            message: Internal Server Error
        }
    ]


**GET CATEGORIES**
----
  Get all categories

* **URL**

  /categories

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 (Ok) <br />
    **Content:** [
      {
        id,
        name,
      }
    ]
 
* **Error Response:**

  * **Code:** 401 (Unauthorized) <br />
    **Content:** [
        {
            message: 'User Unauthorized'
        }
    ]

  * **Code:** 500 (Internal server error) <br />
    **Content:** [
        {
            message: Internal Server Error
        }
    ]


**GET BANNERS**
----
  Get all banners

* **URL**

  /banners

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 (Ok) <br />
    **Content:** [
      {
        id,
        name,
      }
    ]
 
* **Error Response:**

  * **Code:** 401 (Unauthorized) <br />
    **Content:** [
        {
            message: 'User Unauthorized'
        }
    ]

  * **Code:** 500 (Internal server error) <br />
    **Content:** [
        {
            message: Internal Server Error
        }
    ]


**GET ACTIVE BANNERS**
----
  Get all active banners

* **URL**

  /banners/cust

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 (Ok) <br />
    **Content:** [
      {
        id,
        name,
      }
    ]
 
* **Error Response:**

  * **Code:** 401 (Unauthorized) <br />
    **Content:** [
        {
            message: 'User Unauthorized'
        }
    ]

  * **Code:** 500 (Internal server error) <br />
    **Content:** [
        {
            message: Internal Server Error
        }
    ]


**GET WISHLIST**
----
  Get wishlist

* **URL**

  /wishlist

* **Method:**

  `GET`

* **Headers**

  **Required**

  `token=[(access_token from login)]`

* **Success Response:**

  * **Code:** 200 (Ok) <br />
    **Content:** [
      {
        id,
        user_id,
        product_id,
        Product: {object}
      }
    ]
 
* **Error Response:**

  * **Code:** 401 (Unauthorized) <br />
    **Content:** [
        {
            message: 'User Unauthorized'
        }
    ]

  * **Code:** 500 (Internal server error) <br />
    **Content:** [
        {
            message: Internal Server Error
        }
    ]


**GET CART**
----
  Get cart

* **URL**

  /cart

* **Method:**

  `GET`

* **Headers**

  **Required**

  `token=[(access_token from login)]`

* **Success Response:**

  * **Code:** 200 (Ok) <br />
    **Content:** [
      {
        id,
        user_id,
        product_id,
        Product: {object},
        amount,
        status
      }
    ]
 
* **Error Response:**

  * **Code:** 401 (Unauthorized) <br />
    **Content:** [
        {
            message: 'User Unauthorized'
        }
    ]

  * **Code:** 500 (Internal server error) <br />
    **Content:** [
        {
            message: Internal Server Error
        }
    ]


**GET HISTORY**
----
  Get history

* **URL**

  /history

* **Method:**

  `GET`

* **Headers**

  **Required**

  `token=[(access_token from login)]`

* **Success Response:**

  * **Code:** 200 (Ok) <br />
    **Content:** [
      {
        id,
        user_id,
        product_id,
        Product: {object},
        amount,
        status
      }
    ]
 
* **Error Response:**

  * **Code:** 401 (Unauthorized) <br />
    **Content:** [
        {
            message: 'User Unauthorized'
        }
    ]

  * **Code:** 500 (Internal server error) <br />
    **Content:** [
        {
            message: Internal Server Error
        }
    ]


**ADD PRODUCT**
----
  Add product

* **URL**

  /products

* **Method:**

  `POST`

* **Headers**

  **Required**

  `token=[(access_token from login)]`

* **Data Params**

  **Required:**
 
   `name=[string]`
   `image_url=[string]`
   `price=[integer]`
   `stock=[integer]`
   `CategoryId=[integer]`

* **Success Response:**

  * **Code:** 201 (Created) <br />
    **Content:** { 
        id,
        name,
        image_url,
        price,
        stock,
        CategoryId
    }
 
* **Error Response:**

  * **Code:** 400 (Bad request) <br />
    **Content:** [
        {
            message: <content.key> required
        }
    ]

  * **Code:** 401 (Unauthorized) <br />
    **Content:** [
        {
            message: 'User Unauthorized'
        }
    ]

  * **Code:** 500 (Internal server error) <br />
    **Content:** [
        {
            message: Internal Server Error
        }
    ]


**ADD CATEGORY**
----
  Add category

* **URL**

  /categories

* **Method:**

  `POST`

* **Headers**

  **Required**

  `token=[(access_token from login)]`

* **Data Params**

  **Required:**
 
   `name=[string]`

* **Success Response:**

  * **Code:** 201 (Created) <br />
    **Content:** { 
        id,
        name
    }
 
* **Error Response:**

  * **Code:** 400 (Bad request) <br />
    **Content:** [
        {
            message: <content.key> required
        }
    ]

  * **Code:** 401 (Unauthorized) <br />
    **Content:** [
        {
            message: 'User Unauthorized'
        }
    ]

  * **Code:** 500 (Internal server error) <br />
    **Content:** [
        {
            message: Internal Server Error
        }
    ]


**ADD BANNER**
----
  Add banner

* **URL**

  /banners

* **Method:**

  `POST`

* **Headers**

  **Required**

  `token=[(access_token from login)]`

* **Data Params**

  **Required:**
 
   `title=[string]`
   `image_url=[string]`

* **Success Response:**

  * **Code:** 201 (Created) <br />
    **Content:** { 
        id,
        title,
        image_url,
        status
    }
 
* **Error Response:**

  * **Code:** 400 (Bad request) <br />
    **Content:** [
        {
            message: <content.key> required
        }
    ]

  * **Code:** 401 (Unauthorized) <br />
    **Content:** [
        {
            message: 'User Unauthorized'
        }
    ]

  * **Code:** 500 (Internal server error) <br />
    **Content:** [
        {
            message: Internal Server Error
        }
    ]


**ADD TO WISHLIST**
----
  Add to wishlist

* **URL**

  /wishlist

* **Method:**

  `POST`

* **Headers**

  **Required**

  `token=[(access_token from login)]`

* **Data Params**

  **Required:**
 
   `product_id=[integer]`

* **Success Response:**

  * **Code:** 201 (Created) <br />
    **Content:** {
            id,
            user_id,
            product_id,
            Product: {object}
        }
 
* **Error Response:**

  * **Code:** 400 (Bad request) <br />
    **Content:** [
        {
            message: <content.key> required
        }
    ]

  * **Code:** 401 (Unauthorized) <br />
    **Content:** [
        {
            message: 'User Unauthorized'
        }
    ]

  * **Code:** 500 (Internal server error) <br />
    **Content:** [
        {
            message: Internal Server Error
        }
    ]


**ADD TO CART**
----
  Add to cart

* **URL**

  /wishlist

* **Method:**

  `POST`

* **Headers**

  **Required**

  `token=[(access_token from login)]`

* **Data Params**

  **Required:**
 
   `product_id=[integer]`

* **Success Response:**

  * **Code:** 201 (Created) <br />
    **Content:** {
            id,
            user_id,
            product_id,
            Product: {object},
            amount,
            status
        }
 
* **Error Response:**

  * **Code:** 400 (Bad request) <br />
    **Content:** [
        {
            message: <content.key> required
        }
    ]

  * **Code:** 401 (Unauthorized) <br />
    **Content:** [
        {
            message: 'User Unauthorized'
        }
    ]

  * **Code:** 500 (Internal server error) <br />
    **Content:** [
        {
            message: Internal Server Error
        }
    ]


**DELETE PRODUCT**
----
  Delete product

* **URL**

  /products

* **Method:**

  `DELETE`

* **URL Params**

  **Required:**
 
  `id=[integer]`

* **Headers**

  **Required**

  `token=[(access_token from login)]`

* **Success Response:**

  * **Code:** 200 (Ok) <br />
    **Content:** 

    `A product has been successfully deleted`
 
* **Error Response:**

  * **Code:** 401 (Unauthorized) <br />
    **Content:** [
        {
            message: 'User Unauthorized'
        }
    ]

  * **Code:** 500 (Internal server error) <br />
    **Content:** [
        {
            message: Internal Server Error
        }
    ]


**DELETE CATEGORIES**
----
  Delete categories

* **URL**

  /categories

* **Method:**

  `DELETE`

* **URL Params**

  **Required:**
 
  `id=[integer]`

* **Headers**

  **Required**

  `token=[(access_token from login)]`

* **Success Response:**

  * **Code:** 200 (Ok) <br />
    **Content:** 

    `Succcess delete category`
 
* **Error Response:**

  * **Code:** 400 (Bad Request) <br />
    **Content:**

    `The Category still contains one or more product`

  * **Code:** 401 (Unauthorized) <br />
    **Content:** [
        {
            message: 'User Unauthorized'
        }
    ]

  * **Code:** 500 (Internal server error) <br />
    **Content:** [
        {
            message: Internal Server Error
        }
    ]


**DELETE BANNER**
----
  Delete banner

* **URL**

  /banners

* **Method:**

  `DELETE`

* **URL Params**

  **Required:**
 
  `id=[integer]`

* **Headers**

  **Required**

  `token=[(access_token from login)]`

* **Success Response:**

  * **Code:** 200 (Ok) <br />
    **Content:** 

    `Success delete banner`
 
* **Error Response:**

  * **Code:** 401 (Unauthorized) <br />
    **Content:** [
        {
            message: 'User Unauthorized'
        }
    ]

  * **Code:** 500 (Internal server error) <br />
    **Content:** [
        {
            message: Internal Server Error
        }
    ]


**DELETE FROM WISHLIST**
----
  Delete from wishlist

* **URL**

  /wishlist

* **Method:**

  `DELETE`

* **URL Params**

  **Required:**
 
  `id=[integer]`

* **Headers**

  **Required**

  `token=[(access_token from login)]`

* **Success Response:**

  * **Code:** 200 (Ok) <br />
    **Content:** 

    `Wishlist has been successfully deleted`
 
* **Error Response:**

  * **Code:** 401 (Unauthorized) <br />
    **Content:** [
        {
            message: 'User Unauthorized'
        }
    ]

  * **Code:** 500 (Internal server error) <br />
    **Content:** [
        {
            message: Internal Server Error
        }
    ]


**EDIT PRODUCT**
----
  Edit product

* **URL**

  /products

* **Method:**

  `PUT`

* **URL Params**

  **Required:**
 
  `id=[integer]`

* **Headers**

  **Required**

  `token=[(access_token from login)]`

* **Data Params**

  **Required:**
 
   `name=[string]`
   `image_url=[string]`
   `price=[integer]`
   `stock=[integer]`
   `CategoryId=[integer]`

* **Success Response:**

  * **Code:** 200 (Ok) <br />
    **Content:** { 
        id,
        name,
        image_url,
        price,
        stock,
        CategoryId
    }
 
* **Error Response:**

  * **Code:** 400 (Bad request) <br />
    **Content:** [
        {
            message: <content.key> required
        }
    ]

  * **Code:** 401 (Unauthorized) <br />
    **Content:** [
        {
            message: 'User Unauthorized'
        }
    ]

  * **Code:** 500 (Internal server error) <br />
    **Content:** [
        {
            message: Internal Server Error
        }
    ]


**EDIT BANNER**
----
  Edit banner

* **URL**

  /banners

* **Method:**

  `PUT`

* **URL Params**

  **Required:**
 
  `id=[integer]`

* **Headers**

  **Required**

  `token=[(access_token from login)]`

* **Data Params**

  **Required:**
 
   `title=[string]`
   `image_url=[string]`
   `status=[string]`

* **Success Response:**

  * **Code:** 200 (Ok) <br />
    **Content:** { 
        id,
        title,
        image_url,
        status
    }
 
* **Error Response:**

  * **Code:** 400 (Bad request) <br />
    **Content:** [
        {
            message: <content.key> required
        }
    ]

  * **Code:** 401 (Unauthorized) <br />
    **Content:** [
        {
            message: 'User Unauthorized'
        }
    ]

  * **Code:** 500 (Internal server error) <br />
    **Content:** [
        {
            message: Internal Server Error
        }
    ]


**CHANGE BANNER STATUS**
----
  Change banner status

* **URL**

  /banners

* **Method:**

  `PATCH`

* **URL Params**

  **Required:**
 
  `id=[integer]`

* **Headers**

  **Required**

  `token=[(access_token from login)]`

* **Data Params**

  **Required:**

   `status=[string]`

* **Success Response:**

  * **Code:** 200 (Ok) <br />
    **Content:** { 
        id,
        title,
        image_url,
        status
    }
 
* **Error Response:**

  * **Code:** 400 (Bad request) <br />
    **Content:** [
        {
            message: <content.key> required
        }
    ]

  * **Code:** 401 (Unauthorized) <br />
    **Content:** [
        {
            message: 'User Unauthorized'
        }
    ]

  * **Code:** 500 (Internal server error) <br />
    **Content:** [
        {
            message: Internal Server Error
        }
    ]


**UPDATE AMOUNT**
----
  Update amount on cart

* **URL**

  /cart

* **Method:**

  `PATCH`

* **URL Params**

  **Required:**
 
  `id=[integer]`

* **Headers**

  **Required**

  `token=[(access_token from login)]`

* **Data Params**

  **Required:**
 
   `how=[boolean]` (increment jika true, decrement jika false)

* **Success Response:**

  * **Code:** 200 (Ok) <br />
    **Content:** {
        message: 'Update cart successful'
    }
 
* **Error Response:**

  * **Code:** 401 (Unauthorized) <br />
    **Content:** [
        {
            message: 'User Unauthorized'
        }
    ]

  * **Code:** 500 (Internal server error) <br />
    **Content:** [
        {
            message: Internal Server Error
        }
    ]


**UPDATE CHECKOUT**
----
  Checkout

* **URL**

  /checkout

* **Method:**

  `PATCH`

* **Headers**

  **Required**

  `token=[(access_token from login)]`

* **Success Response:**

  * **Code:** 200 (Ok) <br />
    **Content:** {
        message: 'Success update stocks'
    }
 
* **Error Response:**

  * **Code:** 401 (Unauthorized) <br />
    **Content:** [
        {
            message: 'User Unauthorized'
        }
    ]

  * **Code:** 500 (Internal server error) <br />
    **Content:** [
        {
            message: Internal Server Error
        }
    ]


**DELETE FROM CART**
----
  Delete from cart

* **URL**

  /cart

* **Method:**

  `DELETE`

* **URL Params**

  **Required:**
 
  `id=[integer]`

* **Headers**

  **Required**

  `token=[(access_token from login)]`

* **Success Response:**

  * **Code:** 200 (Ok) <br />
    **Content:** {
        message: 'Delete cart successful'
    }
 
* **Error Response:**

  * **Code:** 401 (Unauthorized) <br />
    **Content:** [
        {
            message: 'User Unauthorized'
        }
    ]

  * **Code:** 500 (Internal server error) <br />
    **Content:** [
        {
            message: Internal Server Error
        }
    ]