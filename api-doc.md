# OnCom - Online Commercial Marketplace - Server

​
List of available endpoints:
​
- `POST /login`
- `GET /products`
- `POST /products`
- `GET /products/:id`
- `PUT /products/:id`
- `DELETE /products/:id`

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

- status: 201
- body:
  ​

```json
{
  "access_token": "string"
}
```

### GET /products

description: 
  get all products

Request:

- headers: access_token

Response:

- status: 200
- body:
  ​

```json
[
    {
        "id": 7,
        "name": "Naikin Tempo Lejen",
        "image_url": "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/2fbb7f8f-d64c-4866-8846-ccbcb7fbc45d/tiempo-legend-8-pro-fg-football-boot-LmtpWd.jpg",
        "price": 1299000,
        "stock": 100,
        "createdAt": "2020-11-14T02:57:06.678Z",
        "updatedAt": "2020-11-14T02:57:06.679Z"
    },
    {
        "id": 9,
        "name": "Naikin Air Raksa",
        "image_url": "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/79fa40fd-7a38-4e16-87f6-19e8b65c3608/mercurial-superfly-7-pro-fg-football-boot-wjHPL4.jpg",
        "price": 3599000,
        "stock": 100,
        "createdAt": "2020-11-14T02:59:07.407Z",
        "updatedAt": "2020-11-14T02:59:07.407Z"
    },
    {
        "id": 13,
        "name": "Naikin Udara Kang Jordan",
        "image_url": "https://c.static-nike.com/a/images/t_prod_ss/w_640,c_limit,q_auto,f_auto/a2xc2snk9pr1tnwl8j53/womens-air-jordan-i-twist-release-date.jpg",
        "price": 4999000,
        "stock": 25,
        "createdAt": "2020-11-14T05:25:03.611Z",
        "updatedAt": "2020-11-14T05:25:03.613Z"
    }
]
```
​

### POST /products

description: 
  add new product to the list

Request:

- headers: access_token
- data: 
```json
{
  "name": "string",
  "price": "integer",
  "stock": "integer",
  "image_url": "integer"
}
```

Response:

- status: 200
- body:

```json
{
    "id": 15,
    "name": "Naiki air raksa",
    "image_url": "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/79fa40fd-7a38-4e16-87f6-19e8b65c3608/mercurial-superfly-7-pro-fg-football-boot-wjHPL4.jpg",
    "price": 3599000,
    "stock": 125
}
```


### GET /products/:id

description: 
  get product by id

Request:

- headers: access_token

Response:

- status: 200
- body:

```json
{
    "id": 7,
    "name": "Nike Tiempo Legend Elite Silver Pack",
    "image_url": "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/2fbb7f8f-d64c-4866-8846-ccbcb7fbc45d/tiempo-legend-8-pro-fg-football-boot-LmtpWd.jpg",
    "price": 3099000,
    "stock": 100,
    "createdAt": "2020-11-14T02:57:06.678Z",
    "updatedAt": "2020-11-14T07:09:06.114Z"
}
```


### PUT /products/:id

description: 
  edit product by id

Request:

- headers: access_token
- params: id

Response:

- status: 200
- body:

```json
{
    "msg": "Successfully edited data with id: 15"
}
```


### DELETE /products/:id

description: 
  delete product by id

Request:

- headers: access_token
- params: id

Response:

- status: 200
- body:

```json
{
    "msg": "Successfully deleted product!"
}
```