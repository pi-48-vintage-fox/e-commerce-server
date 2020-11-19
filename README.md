# e-commerce-server

## **Register**

    Register New User

- **URL**

  /register

- **Method:**

  `POST`

- **Data Params**

  {
  name: "admin",
  email: "admin@mail.com",
  password: "1234",
  image:
  "https://www.freepik.com/free-photo/young-attractive-handsome-guy-feels-delighted-gladden-amazed_10518607.htm",
  role: "admin",
  }

- **Success Response:**

  - **Code:** 201 <br />
    **Content:** `{ name: "admin", email: "admin@mail.com", image: "https://www.freepik.com/free-photo/young-attractive-handsome-guy-feels-delighted-gladden-amazed_10518607.htm", role: "admin", }`

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ errorMsg : "email must be unique" }`

  OR

  - **Code:** 400 <br />
    **Content:** `{ errorMsg : "Format must be an email" }`
    OR

  - **Code:** 400 <br />
    **Content:** `{ errorMsg : "Email is required" }`

## **Login**

    Login User

- **URL**

  /login

- **Method:**

  `POST`

- **Data Params**

  {
  email: "admin@mail.com",
  password: "1234"
  }

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{access_token}`

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Email Invalid or Password Invalid" }`

## **GET ALL PRODUCTS**

    Get all Products

- **URL**

  /products

- **Method:**

  `GET`

- **Headers:**

  `{ access_token }`

- **URL Params**

  **Required:**

**Success Response:**

- **Code:** 200 <br />
  **Content:** `[ { "id": 1, "name": "ini hasil edit 33", "image_url": "https://www.freepik.com/free-psd/iphone-11-pro-mockup_10313276.htm", "S": 8, "M": 10, "L": 12, "XL": 20, "price": 150000, "createdAt": "2020-11-10T13:21:03.573Z", "updatedAt": "2020-11-10T15:33:41.521Z" } ]`

- **Error Response:**

  - **Code:** 401 <br />
    **Content:** `{ errorMsg : "Token tidak ditemukan" }`

## **Add Product**

    Add Product

- **URL**

  /products

- **Method:**

  `POST`

- **Headers:**

  `{ access_token }`

- **URL Params**

  **Required:**

**Data Params**

{
name: "Jacket",
image_url: "https://www.freepik.com/free-psd/iphone-11-pro-mockup_10313276.htm",
S: 3,
M: 5,
L: 10,
XL: 12,
price: 150000
}

- **Success Response:**

  - **Code:** 201 <br />
    **Content:** `{ id: 1, name: "Jacket", image_url: "https://www.freepik.com/free-psd/iphone-11-pro-mockup_10313276.htm", S: 3, M: 5, L: 10, XL: 12, price: 150000 "updatedAt": "2020-11-03T09:42:05.042Z", "createdAt": "2020-11-03T09:42:05.042Z" }`

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ errorMsg : "Name product is required" }`

    OR

  - **Code:** 400 <br />
    **Content:** `{ errorMsg : "Price product is required" }`

## **Edit Product**

    Edit Product

- **URL**

  /products/:id

- **Method:**

  `PUT`

- **Headers:**

  `{ access_token }`

- **URL Params**

  **Required:**

  `id=[integer]`

- **Data Params**

  {
  name: "Celana Jeans",
  }

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ id: 1, name: "Celana Jeans", image_url: "https://www.freepik.com/free-psd/iphone-11-pro-mockup_10313276.htm", S: 3, M: 5, L: 10, XL: 12, price: 150000 "updatedAt": "2020-11-03T09:42:05.042Z", "createdAt": "2020-11-03T09:42:05.042Z" }`

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ errorMsg : "Name product is required" }`

    OR

  - **Code:** 400 <br />
    **Content:** `{ errorMsg : "Price product is required" }`

## **Delete Product**

    Delete Product

- **URL**

  /products/:id

- **Method:**

  `DELETE`

- **Headers:**

  `{ access_token }`

- **URL Params**

  **Required:**

  `id=[integer]`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ msg: "Success delete product" }`

- **Error Response:**

  - **Code:** 404 <br />
    **Content:** `{ error : "Not Found" }`

## **GET All Order**

    Get all Order

- **URL**

  /orders

- **Method:**

  `GET`

- **Headers:**

  `{ access_token }`

- **URL Params**

  **Required:**

**Success Response:**

- **Code:** 200 <br />
  **Content:** `[ { "id": 1, UserId: 1, ProductId:1, status: false, "createdAt": "2020-11-10T13:21:03.573Z", "updatedAt": "2020-11-10T15:33:41.521Z" } ]`

- **Error Response:**

  - **Code:** 401 <br />
    **Content:** `{ errorMsg : "Token tidak ditemukan" }`

## **Update Status**

    Update status order product

- **URL**

  /orders/:id

- **Method:**

  `PATCH`

- **Headers:**

  `{ access_token }`

- **URL Params**

  **Required:**

  `id=[integer]`

- **Data Params**

  `{ status: true }`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ msg: "Success update status" }`

- **Error Response:**

  - **Code:** 500 <br />
    **Content:** `{ error : "Server Internal Error" }`

## **Add Orders**

    Add Orders

- **URL**

  /orders

- **Method:**

  `POST`

- **Headers:**

  `{ access_token }`

- **URL Params**

  **Required:**

**Data Params**

{
UserId: 1,
ProductId: 2,
status: false,
size: S,
quantity: 2,
address: 'Jl raya condet',
totalPrice: 150000,
tracking: 'waiting for payment'
}

- **Success Response:**

  - **Code:** 201 <br />
    **Content:** `{ id: 1, UserId: 1, ProductId: 2, status: false, size: S, quantity: 2, address: 'Jl raya condet', totalPrice: 150000, tracking: 'waiting for payment', "updatedAt": "2020-11-03T09:42:05.042Z", "createdAt": "2020-11-03T09:42:05.042Z" }`

- **Error Response:**

  - **Code:** 500 <br />
    **Content:** `{ errorMsg : "Server Internal Error" }`

## **Edit Order**

    Edit Order

- **URL**

  /orders/:id

- **Method:**

  `PUT`

- **Headers:**

  `{ access_token }`

- **URL Params**

  **Required:**

  `id=[integer]`

- **Data Params**

  {
  address: 'Jl raya condet, rt 40/20 no 80', 
  }

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ id: 1, UserId: 1, ProductId: 2, status: false, size: S, quantity: 2, address: 'Jl raya condet, rt 40/20 no 80', totalPrice: 150000, tracking: 'waiting for payment', "updatedAt": "2020-11-03T09:42:05.042Z", "createdAt": "2020-11-03T09:42:05.042Z" }`

- **Error Response:**

  - **Code:** 500 <br />
    **Content:** `{ errorMsg : "Server Internal Error" }`


## **Delete Order**

    Delete Order

- **URL**

  /orders/:id

- **Method:**

  `DELETE`

- **Headers:**

  `{ access_token }`

- **URL Params**

  **Required:**

  `id=[integer]`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ msg: "Success delete" }`

- **Error Response:**

  - **Code:** 404 <br />
    **Content:** `{ error : "Not Found" }`