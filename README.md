# E-Commerce CMS Server

Restful API server for e-commerce

### Features

- Product categories
- Banners
- xxx
- xxx

### RESTful API

**USERS**
| Method | Route | Description |
| ------ | -------------- | --------------------------------------- |
| POST | /register | Create a user account |
| POST | /login | Logs user into the system |
| POST | /googleLogin | Logs user in using Google SignIn|
| GET | /user | Fetch logged in user's data |

**PRODUCT CATEGORIES**

| Method | Route           | Description                |
| ------ | --------------- | -------------------------- |
| GET    | /categories     | Fetch product categories   |
| POST   | /categories     | Add a new product category |
| PUT    | /categories/:id | Modify a category          |
| DELETE | /categories/:id | Delete a category          |

**PRODUCTS**

| Method | Route                          | Description               |
| ------ | ------------------------------ | ------------------------- |
| GET    | /products                      | Fetch all products data   |
| POST   | /products                      | Create a product          |
| POST   | /products/:ProductId/addToCart | Add product to cart       |
| GET    | /products/:ProductId           | Fetch a product's details |
| PUT    | /products/:ProductId           | Modify a product          |
| DELETE | /products/:ProductId           | Delete a product          |

**BANNERS**

| Method | Route        | Description              |
| ------ | ------------ | ------------------------ |
| GET    | /banners     | Fetch all banners data   |
| POST   | /banners     | Create a banner          |
| GET    | /banners/:id | Fetch a banner's details |
| PUT    | /banners/:id | Modify a banner          |
| DELETE | /banners/:id | Delete a banner          |

**CART ITEMS**

| Method | Route                 | Description                   |
| ------ | --------------------- | ----------------------------- |
| GET    | /cartitems            | Fetch all cart items data     |
| POST   | /cartitems            | Create a cart item            |
| GET    | /cartitems/:ProductId | Get a cart item's details     |
| PATCH  | /cartitems/:ProductId | Modify a cart item's quantity |
| DELETE | /cartitems/:ProductId | Remove an item from cart      |

**CARTS**

| Method | Route          | Description                    |
| ------ | -------------- | ------------------------------ |
| GET    | /carts         | Fetch all carts data           |
| GET    | /carts/current | Fetch current active cart data |
| POST   | /carts         | Create a cart                  |
| GET    | /carts/:id     | Fetch a cart's data            |
| PATCH  | /carts/:id     | Modify a cart's status         |
| DELETE | /carts/:id     | Delete a cart                  |

## USERS

### Register An Account

| METHOD | URL       |
| ------ | --------- |
| POST   | /register |

**PARAMETERS**

- **URL Parameters**

  _None_

- **Data Parameters**

  | Fields                  | Type   | Validation                           |
  | ----------------------- | ------ | ------------------------------------ |
  | email **(required)**    | string | Must be a valid email address format |
  | password **(required)** | string |                                      |

  ```json
  {
    "email": "test@h8.com",
    "password": "Hacktiv8"
  }
  ```

**RESPONSES**

- **Success Response**

  | Code | Description                        | Returns                                                           |
  | ---- | ---------------------------------- | ----------------------------------------------------------------- |
  | 201  | Successfully created a new account | An object containing successfully created account's email address |

  ```json
  {
    "email": "test@h8.com"
  }
  ```

- **Error Response**

  | Code | Description           | Returns                            |
  | ---- | --------------------- | ---------------------------------- |
  | 500  | Internal server error | An object containing error message |

  ```json
  { "msg": "Internal server error" }
  ```

**SAMPLE CALL**

```js
$.post('/register/', { email: 'test@h8.com', password: 'Hacktiv8' }).done(
  (result) => {
    console.log(result)
  }
)
```

### Logs User Into The System

| METHOD | URL    |
| ------ | ------ |
| POST   | /login |

**PARAMETERS**

- **URL Parameters**

  _None_

- **Data Parameters**

  | Fields   | Type   | Description          |
  | -------- | ------ | -------------------- |
  | email    | string | User's email address |
  | password | string | User's password      |

  ```js
  {
    user: "test@h8.com",
    password: "Hacktiv8"
  }
  ```

**RESPONSES**

- **Success Response**

  | Code | Description                      | Returns                           |
  | ---- | -------------------------------- | --------------------------------- |
  | 200  | Successfully logged in to system | An object containing access token |

  ```js
  {
    access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJla29AbWFpbC5jb20iLCJpYXQiOjE2MDQ0MjY1ODN9.LEh6nyVlkyk3SR5-1fHSxJrZMXSJWiuwLRUjQKJCcHY",
  }
  ```

- **Error Response**

  | Code | Description                        | Returns                                            |
  | ---- | ---------------------------------- | -------------------------------------------------- |
  | 401  | Invalid email or password supplied | An object containing error message and status code |

  ```js
  { status: 401,
    msg: "Invalid email or password"
    }
  ```

**SAMPLE CALL**

```js
$.post('/login', { user: 'test', password: 'Hacktiv8' }).done((result) => {
  console.log(result)
})
```

### Fetch A User's Details

| METHOD | URL   |
| ------ | ----- |
| GET    | /user |

**PARAMETERS**

- **URL Parameters**

  | Name                  | Type    | Description        |
  | --------------------- | ------- | :----------------- |
  | `id` **_(required)_** | integer | ID of user to find |

- **Data Parameters**

  _None_

**RESPONSES**

- **Success Response**

  | Code | Description                      | Returns                        |
  | ---- | -------------------------------- | ------------------------------ |
  | 200  | Successfully found the user data | An object containing user data |

  ```js
  {
    id: 4,
    name: "Didi",
    email: "didi@mail.com",
    role: "admin",
    avatarUrl: "https://avatars.dicebear.com/api/initials/didi.svg"
  }
  ```

- **Error Response**

  | Code | Description        | Returns                                            |
  | ---- | ------------------ | -------------------------------------------------- |
  | 404  | User was not found | An object containing status code and error message |

  ```js
  { status: 404, msg: "User was not found" }
  ```

**SAMPLE CALL**

```js
$.get('/users/1').done((result) => {
  console.log(result)
})
```

## PRODUCT CATEGORIES

### Fetch products categories

| METHOD | URL         |
| ------ | ----------- |
| GET    | /categories |

**PARAMETERS**

- **URL Parameters**

  _None_

- **Data Parameters**

  _None_

**RESPONSES**

- **Success Response**

  | Code | Description          | Returns                      |
  | ---- | -------------------- | ---------------------------- |
  | 200  | Successful operation | An array of category objects |

  ```js
  ;[
    {
      id: 1,
      name: 'Men',
      parentId: '',
    },
    {
      id: 2,
      name: 'Women',
      parentId: '',
    },
    {
      id: 3,
      name: "Men's shirts",
      parentId: 1,
    },
  ]
  ```

- **Error Response**

  | Code | Description  | Returns                            |
  | ---- | ------------ | ---------------------------------- |
  | 500  | Server error | An object containing error message |

  ```js
  {
    status: 500,
    msg: 'Internal server error'
  }
  ```

**SAMPLE CALL**

```js
$.get('/categories').done((result) => {
  console.log(result)
})
```

### Add A New Category

| METHOD | URL         |
| ------ | ----------- |
| POST   | /categories |

**PARAMETERS**

- **URL Parameters**

  _None_

- **Data Parameters**

  | Fields   | Type   | Description                  | Notes |
  | -------- | ------ | :--------------------------- | ----- |
  | name     | string | Product category's name      |       |
  | parentId | string | Product category's parent ID |       |

  ```js
  {
    name: "Men's jeans",
    parentId: 1
  }
  ```

**RESPONSES**

- **Success Response**

  | Code | Description                                 | Returns                                       |
  | ---- | ------------------------------------------- | --------------------------------------------- |
  | 201  | Successfully created a new product category | An object containing the new product category |

  ```js
  {
    id: 4,
    name: "Men's jeans",
    parentId: 1
  }
  ```

- **Error Response**

  | Code | Description      | Returns                                        |
  | ---- | ---------------- | ---------------------------------------------- |
  | 409  | Validation error | An object containing validation error messages |

  ```js
  {
    status: 409,
    msg: "Category with the same name already exists, please choose another name"
  }
  ```

  | Code | Description           | Returns                            |
  | ---- | --------------------- | ---------------------------------- |
  | 500  | Internal server error | An object containing error message |

  ```js
  {
    msg: 'Internal server error'
  }
  ```

**SAMPLE CALL**

```js
$.post('/categories', { name: "Men's jeans", parentId: 1 }).done((result) => {
  console.log(result)
})
```

### Modify A Category

| METHOD | URL             |
| ------ | --------------- |
| PUT    | /categories/:id |

**PARAMETERS**

- **URL Parameters**

  | Name                  | Type    | Description                      |
  | --------------------- | ------- | :------------------------------- |
  | `id` **_(required)_** | integer | ID of product category to modify |
  | `name`                | string  | Product category's name          |
  | `parentId`            | integer | Product category's parent ID     |

- **Data Parameters**

  _None_

  ```js
  {
    id: 4,
    name: "Men's Sweaters"
  }
  ```

**RESPONSES**

- **Success Response**

  | Code | Description                        | Returns                              |
  | ---- | ---------------------------------- | ------------------------------------ |
  | 200  | Successfully modified the category | An object containing success message |

  ```js
  {
    msg: 'Product category was modified successfully'
  }
  ```

- **Error Response**

  | Code | Description            | Returns                            |
  | ---- | ---------------------- | ---------------------------------- |
  | 404  | Category was not found | An object containing error message |

  ```js
  {
    status: 404,
    msg: 'Product category was not found'
  }
  ```

  | Code | Description  | Returns                                   |
  | ---- | ------------ | ----------------------------------------- |
  | 500  | Server error | An object containing server error message |

  ```js
  {
    status: 500,
    msg: 'Internal server error'
  }
  ```

**SAMPLE CALL**

```js
$.ajax({
  url: '/categories/1',
  type: 'UPDATE',
  data: { id: 4, name: "Men's Sweaters" },
  success: (result) => {
    console.log(result)
  },
})
```

### Delete A Category

| METHOD | URL             |
| ------ | --------------- |
| DELETE | /categories/:id |

**PARAMETERS**

- **URL Parameters**

  | Name                  | Type    | Description              |
  | --------------------- | ------- | :----------------------- |
  | `id` **_(required)_** | integer | ID of category to delete |

- **Data Parameters**

  _None_

**RESPONSES**

- **Success Response**

  | Code | Description                       | Returns                              |
  | ---- | --------------------------------- | ------------------------------------ |
  | 200  | Successfully deleted the category | An object containing success message |

  ```js
  {
    msg: 'Category was deleted successfully'
  }
  ```

- **Error Response**

  | Code | Description     | Returns                            |
  | ---- | --------------- | ---------------------------------- |
  | 404  | Not found error | An object containing error message |

  ```js
  {
    status: 404,
    msg: 'Category was not found'
  }
  ```

  | Code | Description  | Returns                            |
  | ---- | ------------ | ---------------------------------- |
  | 500  | Server error | An object containing error message |

  ```js
  {
    msg: 'Internal server error'
  }
  ```

**SAMPLE CALL**

```js
$.ajax({
  url: '/categories/1',
  type: 'DELETE',
  success: (result) => {
    console.log(result)
  },
})
```

## PRODUCTS

### Fetch All Products Data

| METHOD | URL       |
| ------ | --------- |
| GET    | /products |

**PARAMETERS**

- **URL Parameters**

  _None_

- **Data Parameters**

  _None_

**RESPONSES**

- **Success Response**

  | Code | Description          | Returns                     |
  | ---- | -------------------- | --------------------------- |
  | 200  | Successful operation | An array of product objects |

  ```js
  ;[
    {
      id: 5,
      name: 'Product 1',
      description: 'Description of Product 1',
      price: 50000,
      stock: 50,
      imageUrl: 'https://example.com/jeans/jeans2.jpg',
      imageId: 'jeans/jeans2',
      ProductCategoryId: 5,
      createdAt: '2020-11-03T16:43:42.135Z',
      updatedAt: '2020-11-03T16:43:42.135Z',
    },
    {
      id: 15,
      name: 'Product 2',
      description: 'Description of Product 2',
      price: 75000,
      stock: 100,
      imageUrl: 'https://example.com/sweater/sweater6.jpg',
      imageId: 'sweater/sweater6',
      ProductCategoryId: 4,
      createdAt: '2020-11-03T16:43:42.135Z',
      updatedAt: '2020-11-03T16:43:42.135Z',
    },
  ]
  ```

- **Error Response**

  | Code | Description  | Returns                            |
  | ---- | ------------ | ---------------------------------- |
  | 500  | Server error | An object containing error message |

  ```js
  {
    status: 500,
    msg: 'Internal server error'
  }
  ```

**SAMPLE CALL**

```js
$.get('/products/').done((result) => {
  console.log(result)
})
```

### Add A New Product

| METHOD | URL      |
| ------ | -------- |
| POST   | /product |

**PARAMETERS**

- **URL Parameters**

  _None_

- **Data Parameters**

  | Fields                 | Type    | Description               | Notes |
  | ---------------------- | ------- | :------------------------ | ----- |
  | name **_(required)_**  | string  | Product's name            |       |
  | price **_(required)_** | integer | Product's price           |       |
  | stock **_(required)_** | integer | Product's stock           |       |
  | ProductCategoryId      | integer | Product's category ID     |       |
  | description            | string  | Product's description     |       |
  | imageUrl               | string  | Product's image URL       |       |
  | imageId                | string  | Product's image public ID |       |

  ```js
  {
    id: 15,
    name: "Product 2",
    description: "Description of Product 2",
    price: 75000,
    stock: 100,
    imageUrl: "https://example.com/sweater/sweater6.jpg",
    imageId: "sweater/sweater6",
    ProductCategoryId: 4
  }
  ```

**RESPONSES**

- **Success Response**

  | Code | Description                        | Returns                                           |
  | ---- | ---------------------------------- | ------------------------------------------------- |
  | 201  | Successfully created a new product | An object containing successfully created product |

  ```js
  {
    id: 15,
    name: "Product 2",
    description: "Description of Product 2",
    price: 75000,
    stock: 100,
    imageUrl: "https://example.com/sweater/sweater6.jpg",
    imageId: "sweater/sweater6",
    ProductCategoryId: 4,
    createdAt: "2020-11-03T16:43:42.135Z",
    updatedAt: "2020-11-03T16:43:42.135Z"
  }
  ```

- **Error Response**

  | Code | Description           | Returns                            |
  | ---- | --------------------- | ---------------------------------- |
  | 500  | Internal server error | An object containing error message |

  ```js
  {
    status: 500,
    msg: 'Internal server error'
  }
  ```

**SAMPLE CALL**

```js
const input = {
  id: 15,
  name: 'Product 2',
  description: 'Description of Product 2',
  price: 75000,
  stock: 100,
  imageUrl: 'https://example.com/sweater/sweater6.jpg',
  imageId: 'sweater/sweater6',
  ProductCategoryId: 4,
}

$.post('/product', input).done((result) => {
  console.log(result)
})
```

### Find A Product By ID

| METHOD | URL                  |
| ------ | -------------------- |
| GET    | /products/:ProductId |

**PARAMETERS**

- **URL Parameters**

  | Name                  | Type    | Description           |
  | --------------------- | ------- | :-------------------- |
  | `id` **_(required)_** | integer | ID of product to find |

- **Data Parameters**

  _None_

**RESPONSES**

- **Success Response**

  | Code | Description                    | Returns                      |
  | ---- | ------------------------------ | ---------------------------- |
  | 200  | Successfully found the product | An object containing product |

  ```js
  {
    id: 15,
    name: "Product 2",
    description: "Description of Product 2",
    price: 75000,
    stock: 100,
    imageUrl: "https://example.com/sweater/sweater6.jpg",
    imageId: "sweater/sweater6",
    ProductCategoryId: 4,
    createdAt: "2020-11-03T16:43:42.135Z",
    updatedAt: "2020-11-03T16:43:42.135Z"
  }
  ```

- **Error Response**

  | Code | Description           | Returns                            |
  | ---- | --------------------- | ---------------------------------- |
  | 404  | Product was not found | An object containing error message |

  ```js
  {
    status: 404,
    msg: 'Product was not found'
  }
  ```

**SAMPLE CALL**

```js
$.get('/products/1').done((result) => {
  console.log(result)
})
```

### Modify A Product

| METHOD | URL                  |
| ------ | -------------------- |
| PUT    | /products/:ProductId |

**PARAMETERS**

- **URL Parameters**

  | Name                  | Type    | Description              |
  | --------------------- | ------- | :----------------------- |
  | `id` **_(required)_** | integer | ID of category to modify |

- **Data Parameters**

  | Fields            | Type    | Description               | Notes |
  | ----------------- | ------- | :------------------------ | ----- |
  | name              | string  | Product's name            |       |
  | description       | string  | Product's description     |       |
  | price             | integer | Product's price           |       |
  | stock             | integer | Product's stock           |       |
  | ProductCategoryId | integer | Product's category ID     |       |
  | imageUrl          | string  | Product's image URL       |       |
  | imageId           | string  | Product's image public ID |       |

  ```js
  {
    id: 15,
    name: "Modified name of Product 2",
    description: "Modified description of Product 2",
    price: 60000
  }
  ```

**RESPONSES**

- **Success Response**

  | Code | Description                        | Returns                              |
  | ---- | ---------------------------------- | ------------------------------------ |
  | 200  | Successfully modified the category | An object containing success message |

  ```js
  {
    msg: 'Product was modified successfully'
  }
  ```

- **Error Response**

  | Code | Description           | Returns                            |
  | ---- | --------------------- | ---------------------------------- |
  | 404  | Product was not found | An object containing error message |

  ```js
  {
    status: 404,
    msg: 'Product was not found'
  }
  ```

  | Code | Description  | Returns                            |
  | ---- | ------------ | ---------------------------------- |
  | 500  | Server error | An object containing error message |

  ```js
  {
    msg: 'Internal server error'
  }
  ```

**SAMPLE CALL**

```js
const data = {
  id: 15,
  name: 'Modified name of Product 2',
  description: 'Modified description of Product 2',
  price: 60000,
}

$.ajax({
  url: '/products/1',
  type: 'PUT',
  data: data,
  success: (result) => {
    console.log(result)
  },
})
```

### Delete A Product

| METHOD | URL                  |
| ------ | -------------------- |
| DELETE | /products/:ProductId |

**PARAMETERS**

- **URL Parameters**

  | Name                  | Type    | Description             |
  | --------------------- | ------- | :---------------------- |
  | `id` **_(required)_** | integer | ID of product to delete |

- **Data Parameters**

  _None_

**RESPONSES**

- **Success Response**

  | Code | Description                      | Returns                              |
  | ---- | -------------------------------- | ------------------------------------ |
  | 200  | Successfully deleted the product | An object containing success message |

  ```js
  {
    msg: 'Product was deleted successfully'
  }
  ```

- **Error Response**

  | Code | Description     | Returns                            |
  | ---- | --------------- | ---------------------------------- |
  | 404  | Not found error | An object containing error message |

  ```js
  {
    status: 404,
    msg: 'Product was not found'
  }
  ```

  | Code | Description  | Returns                            |
  | ---- | ------------ | ---------------------------------- |
  | 500  | Server error | An object containing error message |

  ```js
  {
    msg: 'Internal server error'
  }
  ```

**SAMPLE CALL**

```js
$.ajax({
  url: '/products/1',
  type: 'DELETE',
  success: (result) => {
    console.log(result)
  },
})
```

## BANNERS

### Fetch All Banners Data

| METHOD | URL      |
| ------ | -------- |
| GET    | /banners |

**PARAMETERS**

- **URL Parameters**

  _None_

- **Data Parameters**

  _None_

**RESPONSES**

- **Success Response**

  | Code | Description          | Returns                    |
  | ---- | -------------------- | -------------------------- |
  | 200  | Successful operation | An array of banner objects |

  ```js
  [
    {
      id: ,
      title: 'Banner 1',
      status: 'active',
      imageUrl: 'https://example.com/banners/banne1.jpg',
      imageId: 'banners/banner2',
      createdAt: '2020-11-03T16:43:42.135Z',
      updatedAt: '2020-11-03T16:43:42.135Z',
    },
    {
      id: 2,
      title: 'Banner 2',
      status: 'inactive',
      imageUrl: 'https://example.com/banners/banner2.jpg',
      imageId: 'banners/banner2',
      createdAt: '2020-11-03T16:43:42.135Z',
      updatedAt: '2020-11-03T16:43:42.135Z',
    },
  ]
  ```

- **Error Response**

  | Code | Description  | Returns                            |
  | ---- | ------------ | ---------------------------------- |
  | 500  | Server error | An object containing error message |

  ```js
  {
    status: 500,
    msg: 'Internal server error'
  }
  ```

**SAMPLE CALL**

```js
$.get('/banners').done((result) => {
  console.log(result)
})
```

### Add A New Banner

| METHOD | URL     |
| ------ | ------- |
| POST   | /banner |

**PARAMETERS**

- **URL Parameters**

  _None_

- **Data Parameters**

  | Fields                    | Type    | Description              | Notes                  |
  | ------------------------- | ------- | :----------------------- | ---------------------- |
  | title **_(required)_**    | string  | Banner's title           |                        |
  | status **_(required)_**   | integer | Banner's status          | 'active' \| 'inactive' |
  | imageUrl **_(required)_** | string  | Banner's image URL       |                        |
  | imageId **_(required)_**  | string  | Banner's image public ID |                        |

  ```js
  {
      title: 'Banner 2',
      status: 'inactive',
      imageUrl: 'https://example.com/banners/banner2.jpg',
      imageId: 'banners/banner2',
    }
  ```

**RESPONSES**

- **Success Response**

  | Code | Description                       | Returns                                          |
  | ---- | --------------------------------- | ------------------------------------------------ |
  | 201  | Successfully created a new banner | An object containing successfully created banner |

  ```js
  {
      id: 2,
      title: 'Banner 2',
      status: 'inactive',
      imageUrl: 'https://example.com/banners/banner2.jpg',
      imageId: 'banners/banner2',
      createdAt: '2020-11-03T16:43:42.135Z',
      updatedAt: '2020-11-03T16:43:42.135Z',
    }
  ```

- **Error Response**

  | Code | Description           | Returns                            |
  | ---- | --------------------- | ---------------------------------- |
  | 500  | Internal server error | An object containing error message |

  ```js
  {
    status: 500,
    msg: 'Internal server error'
  }
  ```

**SAMPLE CALL**

```js
const input = {
  title: 'Banner 2',
  status: 'inactive',
  imageUrl: 'https://example.com/banners/banner2.jpg',
  imageId: 'banners/banner2',
  createdAt: '2020-11-03T16:43:42.135Z',
  updatedAt: '2020-11-03T16:43:42.135Z',
}

$.post('/banner', input).done((result) => {
  console.log(result)
})
```

### Find A Banner By ID

| METHOD | URL          |
| ------ | ------------ |
| GET    | /banners/:id |

**PARAMETERS**

- **URL Parameters**

  | Name                  | Type    | Description          |
  | --------------------- | ------- | :------------------- |
  | `id` **_(required)_** | integer | ID of banner to find |

- **Data Parameters**

  _None_

**RESPONSES**

- **Success Response**

  | Code | Description                   | Returns                     |
  | ---- | ----------------------------- | --------------------------- |
  | 200  | Successfully found the banner | An object containing banner |

  ```js
  {
      id: 2,
      title: 'Banner 2',
      status: 'inactive',
      imageUrl: 'https://example.com/banners/banner2.jpg',
      imageId: 'banners/banner2',
      createdAt: '2020-11-03T16:43:42.135Z',
      updatedAt: '2020-11-03T16:43:42.135Z',
    }
  ```

- **Error Response**

  | Code | Description          | Returns                            |
  | ---- | -------------------- | ---------------------------------- |
  | 404  | Banner was not found | An object containing error message |

  ```js
  {
    status: 404,
    msg: 'Banner was not found'
  }
  ```

**SAMPLE CALL**

```js
$.get('/banners/2').done((result) => {
  console.log(result)
})
```

### Modify A Banner

| METHOD | URL          |
| ------ | ------------ |
| PUT    | /banners/:id |

**PARAMETERS**

- **URL Parameters**

  | Name                  | Type    | Description              |
  | --------------------- | ------- | :----------------------- |
  | `id` **_(required)_** | integer | ID of category to modify |

- **Data Parameters**

  | Fields   | Type    | Description              | Notes                  |
  | -------- | ------- | :----------------------- | ---------------------- |
  | title    | string  | Banner's title           |                        |
  | status   | integer | Banner's status          | 'active' \| 'inactive' |
  | imageUrl | string  | Banner's image URL       |                        |
  | imageId  | string  | Banner's image public ID |                        |

  ```js
  {
    title: 'Modified Banner 2',
    status: 'active',
  }
  ```

**RESPONSES**

- **Success Response**

  | Code | Description                        | Returns                              |
  | ---- | ---------------------------------- | ------------------------------------ |
  | 200  | Successfully modified the category | An object containing success message |

  ```js
  {
    msg: 'Banner modified successfully'
  }
  ```

- **Error Response**

  | Code | Description          | Returns                            |
  | ---- | -------------------- | ---------------------------------- |
  | 404  | Banner was not found | An object containing error message |

  ```js
  {
    status: 404,
    msg: 'Banner was not found'
  }
  ```

  | Code | Description  | Returns                            |
  | ---- | ------------ | ---------------------------------- |
  | 500  | Server error | An object containing error message |

  ```js
  {
    status: 500,
    msg: 'Internal server error'
  }
  ```

**SAMPLE CALL**

```js
const data = {
  title: 'Modified Banner 2',
  status: 'active',
}

$.ajax({
  url: '/banners/1',
  type: 'PUT',
  data: data,
  success: (result) => {
    console.log(result)
  },
})
```

### Delete A Banner

| METHOD | URL          |
| ------ | ------------ |
| DELETE | /banners/:id |

**PARAMETERS**

- **URL Parameters**

  | Name                  | Type    | Description            |
  | --------------------- | ------- | :--------------------- |
  | `id` **_(required)_** | integer | ID of banner to delete |

- **Data Parameters**

  _None_

**RESPONSES**

- **Success Response**

  | Code | Description                     | Returns                              |
  | ---- | ------------------------------- | ------------------------------------ |
  | 200  | Successfully deleted the banner | An object containing success message |

  ```js
  {
    msg: 'Banner was deleted successfully'
  }
  ```

- **Error Response**

  | Code | Description     | Returns                            |
  | ---- | --------------- | ---------------------------------- |
  | 404  | Not found error | An object containing error message |

  ```js
  {
    status: 404,
    msg: 'Banner was not found'
  }
  ```

  | Code | Description  | Returns                            |
  | ---- | ------------ | ---------------------------------- |
  | 500  | Server error | An object containing error message |

  ```js
  {
    status: 500,
    msg: 'Internal server error'
  }
  ```

**SAMPLE CALL**

```js
$.ajax({
  url: '/banners/1',
  type: 'DELETE',
  success: (result) => {
    console.log(result)
  },
})
```

## CART ITEMS

### Fetch All Cart Items Data

| METHOD | URL        |
| ------ | ---------- |
| GET    | /cartitems |

**PARAMETERS**

- **URL Parameters**

  _None_

- **Data Parameters**

  _None_

**RESPONSES**

- **Success Response**

  | Code | Description          | Returns                       |
  | ---- | -------------------- | ----------------------------- |
  | 200  | Successful operation | An array of cart item objects |

  ```js
  ;[
    {
      id: 1,
      CartId: 1,
      ProductId: 1,
      quantity: 5,
    },
    {
      id: 2,
      CartId: 1,
      ProductId: 2,
      quantity: 15,
    },
  ]
  ```

- **Error Response**

  | Code | Description  | Returns                            |
  | ---- | ------------ | ---------------------------------- |
  | 500  | Server error | An object containing error message |

  ```js
  {
    status: 500,
    msg: 'Internal server error'
  }
  ```

**SAMPLE CALL**

```js
$.get('/cartitems').done((result) => {
  console.log(result)
})
```

### Add A New Cart Item

| METHOD | URL        |
| ------ | ---------- |
| POST   | /cartitems |

**PARAMETERS**

- **URL Parameters**

  _None_

- **Data Parameters**

  | Fields                     | Type    | Description          | Notes                 |
  | -------------------------- | ------- | :------------------- | --------------------- |
  | ProductId **_(required)_** | integer | Product's ID         |                       |
  | quantity **_(required)_**  | integer | Cart item's quantity | Cannot be less than 1 |

  ```js
  {
    ProductId: 2,
    quantity: 10
  }
  ```

**RESPONSES**

- **Success Response**

  | Code | Description                          | Returns                                             |
  | ---- | ------------------------------------ | --------------------------------------------------- |
  | 201  | Successfully created a new cart item | An object containing successfully created cart item |

  ```js
  {
    id: 3,
    CartId: 3,
    ProductId: 5,
    quantity: 10,
    createdAt: '2020-11-03T16:43:42.135Z',
    updatedAt: '2020-11-03T16:43:42.135Z',
  }
  ```

- **Error Response**

  | Code | Description           | Returns                            |
  | ---- | --------------------- | ---------------------------------- |
  | 500  | Internal server error | An object containing error message |

  ```js
  {
    status: 500,
    msg: 'Internal server error'
  }
  ```

**SAMPLE CALL**

```js
$.post('/cartitems', { ProductId: 2, quantity: 5 }).done((result) => {
  console.log(result)
})
```

### Find A Cart Item's Details

| METHOD | URL                   |
| ------ | --------------------- |
| GET    | /cartitems/:ProductId |

**PARAMETERS**

- **URL Parameters**

  | Name                         | Type    | Description  |
  | ---------------------------- | ------- | :----------- |
  | `ProductId` **_(required)_** | integer | Product's ID |

- **Data Parameters**

  _None_

**RESPONSES**

- **Success Response**

  | Code | Description                      | Returns                        |
  | ---- | -------------------------------- | ------------------------------ |
  | 200  | Successfully found the cart item | An object containing cart item |

  ```js
  {
    id: 3,
    CartId: 3,
    ProductId: 5,
    quantity: 10,
    createdAt: '2020-11-03T16:43:42.135Z',
    updatedAt: '2020-11-03T16:43:42.135Z',
  }
  ```

- **Error Response**

  | Code | Description             | Returns                            |
  | ---- | ----------------------- | ---------------------------------- |
  | 404  | Cart item was not found | An object containing error message |

  ```js
  {
    status: 404,
    msg: 'Cart was not found'
  }
  ```

**SAMPLE CALL**

```js
$.get('/cartitems/2').done((result) => {
  console.log(result)
})
```

### Change A Cart Item's Quantity

| METHOD | URL                   |
| ------ | --------------------- |
| PATCH  | /cartitems/:ProductId |

**PARAMETERS**

- **URL Parameters**

  | Name                         | Type    | Description  |
  | ---------------------------- | ------- | :----------- |
  | `ProductId` **_(required)_** | integer | Product's ID |

- **Data Parameters**

  | Fields                    | Type    | Description          | Notes |
  | ------------------------- | ------- | :------------------- | ----- |
  | quantity **_(required)_** | integer | Card item's quantity |       |

  ```js
  {
    quantity: 30,
  }
  ```

**RESPONSES**

- **Success Response**

  | Code | Description                         | Returns                                 |
  | ---- | ----------------------------------- | --------------------------------------- |
  | 200  | Successfully modified the cart item | An object containing modified cart item |

  ```js
  {
    id: 3,
    CartId: 3,
    ProductId: 5,
    quantity: 30,
    createdAt: '2020-11-03T16:43:42.135Z',
    updatedAt: '2020-11-03T17:43:42.135Z',
  }
  ```

- **Error Response**

  | Code | Description             | Returns                            |
  | ---- | ----------------------- | ---------------------------------- |
  | 404  | Cart item was not found | An object containing error message |

  ```js
  {
    status: 404,
    msg: 'Cart item was not found'
  }
  ```

  | Code | Description  | Returns                            |
  | ---- | ------------ | ---------------------------------- |
  | 500  | Server error | An object containing error message |

  ```js
  {
    status: 500,
    msg: 'Internal server error'
  }
  ```

**SAMPLE CALL**

```js
$.ajax({
  url: '/cartitems/2',
  type: 'PATCH',
  data: { quantity: 30 },
  success: (result) => {
    console.log(result)
  },
})
```

### Delete A Cart Item

| METHOD | URL                   |
| ------ | --------------------- |
| DELETE | /cartitems/:ProductId |

**PARAMETERS**

- **URL Parameters**

  | Name                         | Type    | Description  |
  | ---------------------------- | ------- | :----------- |
  | `ProductId` **_(required)_** | integer | Product's ID |

- **Data Parameters**

  _None_

**RESPONSES**

- **Success Response**

  | Code | Description                        | Returns                              |
  | ---- | ---------------------------------- | ------------------------------------ |
  | 200  | Successfully deleted the cart item | An object containing success message |

  ```js
  {
    msg: 'Cart item was removed successfully'
  }
  ```

- **Error Response**

  | Code | Description     | Returns                            |
  | ---- | --------------- | ---------------------------------- |
  | 404  | Not found error | An object containing error message |

  ```js
  {
    status: 404,
    msg: 'Cart was not found'
  }
  ```

  | Code | Description  | Returns                            |
  | ---- | ------------ | ---------------------------------- |
  | 500  | Server error | An object containing error message |

  ```js
  {
    status: 500,
    msg: 'Internal server error'
  }
  ```

**SAMPLE CALL**

```js
$.ajax({
  url: '/cartitems/3',
  type: 'DELETE',
  success: (result) => {
    console.log(result)
  },
})
```

## CARTS

### Fetch All Carts Data

| METHOD | URL    |
| ------ | ------ |
| GET    | /carts |

**PARAMETERS**

- **URL Parameters**

  _None_

- **Data Parameters**

  _None_

**RESPONSES**

- **Success Response**

  | Code | Description          | Returns                  |
  | ---- | -------------------- | ------------------------ |
  | 200  | Successful operation | An array of cart objects |

  ```js
  ;[
    {
      id: 1,
      UserId: 1,
      status: 'new',
    },
    {
      id: 2,
      UserId: 2,
      status: 'complete',
    },
  ]
  ```

- **Error Response**

  | Code | Description  | Returns                            |
  | ---- | ------------ | ---------------------------------- |
  | 500  | Server error | An object containing error message |

  ```js
  {
    status: 500,
    msg: 'Internal server error'
  }
  ```

**SAMPLE CALL**

```js
$.get('/carts').done((result) => {
  console.log(result)
})
```

### Add A New Cart

| METHOD | URL    |
| ------ | ------ |
| POST   | /carts |

**PARAMETERS**

- **URL Parameters**

  _None_

- **Data Parameters**

  _None_

**RESPONSES**

- **Success Response**

  | Code | Description                     | Returns                                        |
  | ---- | ------------------------------- | ---------------------------------------------- |
  | 201  | Successfully created a new cart | An object containing successfully created cart |

  ```js
  {
    id: 3,
    UserId: 2,
    status: 'new',
    createdAt: '2020-11-03T16:43:42.135Z',
    updatedAt: '2020-11-03T16:43:42.135Z',
  }
  ```

- **Error Response**

  | Code | Description           | Returns                            |
  | ---- | --------------------- | ---------------------------------- |
  | 500  | Internal server error | An object containing error message |

  ```js
  {
    status: 500,
    msg: 'Internal server error'
  }
  ```

**SAMPLE CALL**

```js
$.post('/carts').done((result) => {
  console.log(result)
})
```

### Find A Cart By ID

| METHOD | URL        |
| ------ | ---------- |
| GET    | /carts/:id |

**PARAMETERS**

- **URL Parameters**

  | Name                  | Type    | Description        |
  | --------------------- | ------- | :----------------- |
  | `id` **_(required)_** | integer | ID of cart to find |

- **Data Parameters**

  _None_

**RESPONSES**

- **Success Response**

  | Code | Description                 | Returns                   |
  | ---- | --------------------------- | ------------------------- |
  | 200  | Successfully found the cart | An object containing cart |

  ```js
  {
    id: 3,
    UserId: 2,
    status: 'paid',
    createdAt: '2020-11-03T16:43:42.135Z',
    updatedAt: '2020-11-03T16:43:42.135Z',
  }
  ```

- **Error Response**

  | Code | Description        | Returns                            |
  | ---- | ------------------ | ---------------------------------- |
  | 404  | Cart was not found | An object containing error message |

  ```js
  {
    status: 404,
    msg: 'Cart was not found'
  }
  ```

**SAMPLE CALL**

```js
$.ajax({
  url: '/carts',
  type: 'POST',
  headers: { access_token },
  success: (result) => {
    console.log(result)
  },
})
```

### Modify A Cart

| METHOD | URL        |
| ------ | ---------- |
| PATCH  | /carts/:id |

**PARAMETERS**

- **URL Parameters**

  | Name                  | Type    | Description              |
  | --------------------- | ------- | :----------------------- |
  | `id` **_(required)_** | integer | ID of category to modify |

- **Data Parameters**

  | Fields | Type    | Description   | Notes                                       |
  | ------ | ------- | :------------ | ------------------------------------------- |
  | status | integer | Cart's status | 'new' \| 'checkout' \| 'paid' \| 'complete' |

  ```js
  {
    id: 3,
    UserId: 2,
    status: 'complete',
    createdAt: '2020-11-03T16:43:42.135Z',
    updatedAt: '2020-12-03T16:43:42.135Z',
  }
  ```

**RESPONSES**

- **Success Response**

  | Code | Description                        | Returns                              |
  | ---- | ---------------------------------- | ------------------------------------ |
  | 200  | Successfully modified the category | An object containing success message |

  ```js
  {
    msg: 'Cart status was modified successfully'
  }
  ```

- **Error Response**

  | Code | Description        | Returns                            |
  | ---- | ------------------ | ---------------------------------- |
  | 404  | Cart was not found | An object containing error message |

  ```js
  {
    status: 404,
    msg: 'Cart was not found'
  }
  ```

  | Code | Description  | Returns                            |
  | ---- | ------------ | ---------------------------------- |
  | 500  | Server error | An object containing error message |

  ```js
  {
    status: 500,
    msg: 'Internal server error'
  }
  ```

**SAMPLE CALL**

```js
$.ajax({
  url: '/carts/1',
  type: 'PATCH',
  data: { status: 'complete' },
  success: (result) => {
    console.log(result)
  },
})
```

### Delete A Cart

| METHOD | URL        |
| ------ | ---------- |
| DELETE | /carts/:id |

**PARAMETERS**

- **URL Parameters**

  | Name                  | Type    | Description          |
  | --------------------- | ------- | :------------------- |
  | `id` **_(required)_** | integer | ID of cart to delete |

- **Data Parameters**

  _None_

**RESPONSES**

- **Success Response**

  | Code | Description                   | Returns                              |
  | ---- | ----------------------------- | ------------------------------------ |
  | 200  | Successfully deleted the cart | An object containing success message |

  ```js
  {
    msg: 'Cart was deleted successfully'
  }
  ```

- **Error Response**

  | Code | Description     | Returns                            |
  | ---- | --------------- | ---------------------------------- |
  | 404  | Not found error | An object containing error message |

  ```js
  {
    status: 404,
    msg: 'Cart was not found'
  }
  ```

  | Code | Description  | Returns                            |
  | ---- | ------------ | ---------------------------------- |
  | 500  | Server error | An object containing error message |

  ```js
  {
    status: 500,
    msg: 'Internal server error'
  }
  ```

**SAMPLE CALL**

```js
$.ajax({
  url: '/carts/1',
  type: 'DELETE',
  success: (result) => {
    console.log(result)
  },
})
```
