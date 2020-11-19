# hacktiv-garden-server

​
List of available endpoints:
​
- `POST /register`
- `POST /login`
- `POST /products`
- `GET /products`
- `PUT /products/:id`
- `DELETE /products/:id`
- `POST /carts`
- `GET /carts`
- `PUT /carts/:id`
- `DELETE /carts/:id`

### POST /register

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 201
- body:
  ​

```json
{
  "id": "integer",
  "email": "string",
  "access_token": "jwt string"
}
}
```

### POST /login

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "email": "string",
    "access_token": "jwt string"
}
```
- status: 401
- body:
  ​

```json
{
    "message": "email/password is wrong."
}
```
- status: 401
- body:
  ​

```json
{
    "message":"email and password must be filled"
}
```

### POST /prducts

description: 
  Add product to databasae
Request:
- headers: access_token (string)
```json
{
    "name": "Liverpool 1st jersey-player",
    "image_url": "https://www.soccerpro.com/wp-content/uploads/cz2625_687_nike_liverpool_home_match_jsy_2020_21_01.jpg",
    "price": 130000000,
    "stock": 10,
    "category": "Nike"
},
```

Response:

- status: 201
- body:

```json
{
    "name": "Liverpool 1st jersey-player",
    "image_url": "https://www.soccerpro.com/wp-content/uploads/cz2625_687_nike_liverpool_home_match_jsy_2020_21_01.jpg",
    "price": 130000000,
    "stock": 10,
    "category": "Nike"
}
```

### GET /products

description: 
  get all products from database

Request:

- headers: access_token (string)

Response:

- status: 200
- body:

```json
[
    {
       "name": "Liverpool 1st jersey-player",
      "image_url": "https://www.soccerpro.com/wp-content/uploads/cz2625_687_nike_liverpool_home_match_jsy_2020_21_01.jpg",
      "price": 1600000,
      "stock": 10,
      "category": "Nike"
    },
    {
        "name": "Liverpool 3rd jersey-player",
        "image_url": "https://www.soccerpro.com/wp-content/uploads/cz3200_060_nike_liverpool_3rd_match_jsy_2020_21_01.jpg",
        "price": 1600000,
        "stock": 10,
        "category": "Nike"
    },
    {
        "name": "Man City 1st jersey-player",
        "image_url": "https://www.soccerpro.com/wp-content/uploads/757058_01_puma_mancity_home_jsy_2020_21_01.jpg",
        "price": 1400000,
        "stock": 10,
        "category": "Puma",
    },
    {
        "name": "Arsenal 1st jersey-player",
        "image_url": "https://www.soccerpro.com/wp-content/uploads/fh7818_adidas_w_adidas_arsenal_home_jsy_2020_21_01.jpg",
        "price": 1200000,
        "stock": 10,
        "category": "Adidas",
    },
    {
        "name": "Arsenal 3rd jersey-player",
        "image_url": "https://www.soccerpro.com/wp-content/uploads/gh6653_adidas_arsenal_3rd_jsy_2020_21_01.jpg",
        "price": 1200000,
        "stock": 10,
        "category": "Adidas",
    },
    {
        "name": "Barcelona 1st jersey-player",
        "image_url": "https://www.soccerpro.com/wp-content/uploads/cd4232_456_nike_barca_home_jsy_2020_21_01.jpg",
        "price": 1600000,
        "stock": 10,
        "category": "Nike",
    }
  ] 

```

### PUT /products/:id

description: 
  add a product

Request:

- headers: access_token (string)
- params: 
    - id: "integer" required
 ```json
{
    "name": "string",
    "image_url": "string",
    "price": "integer",
    "stock": "integer",
    "category": "string"
},
```


Response:

- status: 200
- body:

```json
{
    "name": "string",
    "image_url": "string",
    "price": "integer",
    "stock": "integer",
    "category": "string"
},
```

### DELETE /products

description: 
  delete product

Request:

- headers: access_token (string)
- params: 
  - id: "integer" required

Response:

- status: 200
- body:

```json
{
    "msg":"Product has been deleted."
}
```

### POST /carts

description: 
  Add cart to database
Request:
- headers: access_token (string)
```json
{
   "quantity": 2,
    "status": "Unpaid",
},
```

Response:

- status: 201
- body:

```json
{
    "ProductId": 1,
    "UserId": 2,
    "quantity": 2,
    "status": "Unpaid",
    "updatedAt": "2020-11-17T15:32:47.129Z",
    "createdAt": "2020-11-17T15:32:47.129Z"
}
```

### GET /carts

description: 
  get all products from database

Request:

- headers: access_token (string)

Response:

- status: 200
- body:

```json
[
    {
        "UserId": 2,
        "ProductId": 1,
        "quantity": 2,
        "status": "Unpaid",
        "createdAt": "2020-11-17T15:32:47.129Z",
        "updatedAt": "2020-11-17T15:32:47.129Z",
        "Product": {
            "id": 1,
            "name": "Liverpool 1st jersey-player",
            "image_url": "https://www.soccerpro.com/wp-content/uploads/cz2625_687_nike_liverpool_home_match_jsy_2020_21_01.jpg",
            "price": 1600000,
            "stock": 4,
            "category": "Nike",
            "UserId": 1,
            "createdAt": "2020-11-17T14:30:36.157Z",
            "updatedAt": "2020-11-17T15:32:47.147Z"
        }
    }
]

```

### PUT /carts/:id

description: 
  add a product

Request:

- headers: access_token (string)
- params: 
    - id: "integer" required
 ```json
{
    "quantity": 4,
    "status": "paid",
},
```


Response:

- status: 200
- body:

```json
{
    "UserId": 2,
    "ProductId": 1,
    "quantity": 4,
    "status": "paid",
    "createdAt": "2020-11-17T15:32:47.129Z",
    "updatedAt": "2020-11-17T15:33:57.474Z"
}
```

### DELETE /cart

description: 
  delete product

Request:

- headers: access_token (string)
- params: 
  - id: "integer" required

Response:

- status: 200
- body:

```json
{
    "msg":"Cart has been deleted."
}
```
