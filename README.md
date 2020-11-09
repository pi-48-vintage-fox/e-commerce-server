# E-Commerce CMS Server

Restful API server for e-commerce

### Features

- xxx
- xxx
- xxx
- xxx

### RESTful API

**USERS**
| Method | Route | Description |
| ------ | -------------- | --------------------------------------- |
| POST | /login | Logs user into the system |
| GET | /users/:id | Fetch a user's data |

**PRODUCT CATEGORIES**

| Method | Route           | Description                |
| ------ | --------------- | -------------------------- |
| GET    | /categories     | Fetch product categories   |
| POST   | /categories     | Add a new product category |
| PUT    | /categories/:id | Modify a category          |
| DELETE | /categories/:id | Delete a category          |

**PRODUCTS**

| Method | Route         | Description               |
| ------ | ------------- | ------------------------- |
| GET    | /products     | Fetch all products data   |
| POST   | /products     | Create a product          |
| GET    | /products/:id | Fetch a product's details |
| PUT    | /products/:id | Modify a product          |
| DELETE | /products/:id | Delete a product          |

**BANNERS**

| Method | Route        | Description              |
| ------ | ------------ | ------------------------ |
| GET    | /banners     | Fetch all banners data   |
| POST   | /banners     | Create a banner          |
| GET    | /banners/:id | Fetch a banner's details |
| PUT    | /banners/:id | Modify a banner          |
| DELETE | /banners/:id | Delete a banner          |

## USERS

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

  | Code | Description                      | Returns                                                 |
  | ---- | -------------------------------- | ------------------------------------------------------- |
  | 200  | Successfully logged in to system | An object containing access token and user's avatar URL |

  ```js
  {
    access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJla29AbWFpbC5jb20iLCJpYXQiOjE2MDQ0MjY1ODN9.LEh6nyVlkyk3SR5-1fHSxJrZMXSJWiuwLRUjQKJCcHY",
    avatar: "https://avatars.dicebear.com/api/jdenticon/test.svg"
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

| METHOD | URL        |
| ------ | ---------- |
| GET    | /users/:id |

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
    avatarUrl: "https://avatars.dicebear.com/api/jdenticon/didi.svg"
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
  [
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

  | Fields | Type   | Description                  | Notes |
  | ------ | ------ | :--------------------------- | ----- |
  | name   | string | Product category's name      |       |
  | name   | string | Product category's parent ID |       |

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
  [
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

  | Fields                             | Type    | Description               | Notes |
  | ---------------------------------- | ------- | :------------------------ | ----- |
  | name **_(required)_**              | string  | Product's name            |       |
  | price **_(required)_**             | integer | Product's price           |       |
  | stock **_(required)_**             | integer | Product's stock           |       |
  | ProductCategoryId **_(required)_** | integer | Product's category ID     |       |
  | description                        | string  | Product's description     |       |
  | imageUrl                           | string  | Product's image URL       |       |
  | imageId                            | string  | Product's image public ID |       |

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

| METHOD | URL           |
| ------ | ------------- |
| GET    | /products/:id |

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

| METHOD | URL           |
| ------ | ------------- |
| PUT    | /products/:id |

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
    msg: 'Product modified successfully'
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

| METHOD | URL           |
| ------ | ------------- |
| DELETE | /products/:id |

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
