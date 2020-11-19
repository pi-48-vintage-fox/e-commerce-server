# API DOCUMENTATION 

List Endpoints :
- `POST /login`
- `GET /product`
- `POST /product`
- `PUT /product/:id`
- `PATCH /product/:id`
- `DELETE /product/:id`
- `GET /category`

- `GET /productCustomer`
- `GET /cart`
- `GET /cart/:id`
- `POST /cart`
- `DELETE /cart`
- `PATCH /cart`

### POST /login :

Request:
body : 

```json
{
    "title": "yogi@mail.com",
    "password": "yogi123",
}
```

Response:
status code(200)

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ5b2dpQG1haWwuY29tIiwiaWF0IjoxNjA0NDExNjI5fQ.vk2zyhtg9oPPCskOYu_koDLxEqirTQCwI_Xm_sK7fsc"
}
```

JIKA ERROR
- VALIDASI 
: Response: status code(404)
```json
"Email / password is wrong ..!"
```

### GET /product :

Request:
headers : 

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ5b2dpQG1haWwuY29tIiwiaWF0IjoxNjA0NDExNjI5fQ.vk2zyhtg9oPPCskOYu_koDLxEqirTQCwI_Xm_sK7fsc"
}
```

Response:
status code(201)

```json
[
    {
        "id": 13,
        "name": "Samsung galaxy fold 2",
        "image_url": "https://cdn-asset.jawapos.com/wp-content/uploads/2020/04/HP-samsung-terbaru-420x323.jpg",
        "price": 15000000,
        "stock": 2,
        "CategoryId": 3,
        "createdAt": "2020-11-12T10:44:53.933Z",
        "updatedAt": "2020-11-12T10:44:53.933Z",
        "Category": {
            "id": 3,
            "name": "Handphone & Accessories",
            "createdAt": "2020-11-09T08:49:38.448Z",
            "updatedAt": "2020-11-09T08:49:38.448Z"
        }
    }
]
```

### POST /product :

Request:
headers : 

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ5b2dpQG1haWwuY29tIiwiaWF0IjoxNjA0NDExNjI5fQ.vk2zyhtg9oPPCskOYu_koDLxEqirTQCwI_Xm_sK7fsc"
}
```
body : 

```json
[
    {
        "id": 13,
        "name": "Samsung galaxy fold 2",
        "image_url": "https://cdn-asset.jawapos.com/wp-content/uploads/2020/04/HP-samsung-terbaru-420x323.jpg",
        "price": 15000000,
        "stock": 2,
        "CategoryId": 3,
        "createdAt": "2020-11-12T10:44:53.933Z",
        "updatedAt": "2020-11-12T10:44:53.933Z",
        "Category": 3
    }
]
```

Response:
status code(201)

```json
[
    {
        "id": 13,
        "name": "Samsung galaxy fold 2",
        "image_url": "https://cdn-asset.jawapos.com/wp-content/uploads/2020/04/HP-samsung-terbaru-420x323.jpg",
        "price": 15000000,
        "stock": 2,
        "CategoryId": 3,
        "createdAt": "2020-11-12T10:44:53.933Z",
        "updatedAt": "2020-11-12T10:44:53.933Z",
        "Category": {
            "id": 3,
            "name": "Handphone & Accessories",
            "createdAt": "2020-11-09T08:49:38.448Z",
            "updatedAt": "2020-11-09T08:49:38.448Z"
        }
    }
]
```

JIKA ERROR
- VALIDASI 
: Response: status code(400)
```json
"Validation error: Name must be create",
"Validation error: Image_url must be create"
"Validation error: Price must be create",
"Validation error: Stock must be create"
```

### PUT /product/:id :

Request:
headers : 

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ5b2dpQG1haWwuY29tIiwiaWF0IjoxNjA0NDExNjI5fQ.vk2zyhtg9oPPCskOYu_koDLxEqirTQCwI_Xm_sK7fsc"
}
```
params:
```json
id: [integer]
````
body : 

```json
[
    {
        "id": 13,
        "name": "Samsung galaxy fold 2",
        "image_url": "https://cdn-asset.jawapos.com/wp-content/uploads/2020/04/HP-samsung-terbaru-420x323.jpg",
        "price": 15000000,
        "stock": 2,
        "CategoryId": 3,
        "createdAt": "2020-11-12T10:44:53.933Z",
        "updatedAt": "2020-11-12T10:44:53.933Z",
        "Category": 3
    }
]
```

Response:
status code(201)

```json
[
    {
        "id": 13,
        "name": "Samsung galaxy fold 2",
        "image_url": "https://cdn-asset.jawapos.com/wp-content/uploads/2020/04/HP-samsung-terbaru-420x323.jpg",
        "price": 15000000,
        "stock": 2,
        "CategoryId": 3,
        "createdAt": "2020-11-12T10:44:53.933Z",
        "updatedAt": "2020-11-12T10:44:53.933Z",
        "Category": 3
    }
]
```

JIKA ERROR
- VALIDASI 
: Response: status code(404)
```json
"Data Not Found"
```
: Response: status code(401)
```json
"NotAuthorize"
```
: Response: status code(400)
```json
"Validation error: Name must be create",
"Validation error: Image_url must be create"
"Validation error: Price must be create",
"Validation error: Stock must be create"
```

### PATCH /product/:id :

Request:
headers : 

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ5b2dpQG1haWwuY29tIiwiaWF0IjoxNjA0NDExNjI5fQ.vk2zyhtg9oPPCskOYu_koDLxEqirTQCwI_Xm_sK7fsc"
}
```
params:
```json
id: [integer]
````
body : 

```json
[
    {
        "id": 13,
        "name": "Samsung galaxy fold 2",
        "image_url": "https://cdn-asset.jawapos.com/wp-content/uploads/2020/04/HP-samsung-terbaru-420x323.jpg",
        "price": 15000000,
        "stock": 2,
        "CategoryId": 3,
        "createdAt": "2020-11-12T10:44:53.933Z",
        "updatedAt": "2020-11-12T10:44:53.933Z",
        "Category": 3
    }
]
```

Response:
status code(201)

```json
[
    {
        "id": 13,
        "name": "Samsung galaxy fold 2",
        "image_url": "https://cdn-asset.jawapos.com/wp-content/uploads/2020/04/HP-samsung-terbaru-420x323.jpg",
        "price": 15000000,
        "stock": 2,
        "CategoryId": 3,
        "createdAt": "2020-11-12T10:44:53.933Z",
        "updatedAt": "2020-11-12T10:44:53.933Z",
        "Category": 3
    }
]
```

JIKA ERROR
- VALIDASI 
: Response: status code(404)
```json
"Data Not Found"
```
: Response: status code(401)
```json
"NotAuthorize"
```
: Response: status code(400)
```json
"Validation error: Category must be create"
```

### DELETE /product/:id :

Request:
headers : 

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ5b2dpQG1haWwuY29tIiwiaWF0IjoxNjA0NDExNjI5fQ.vk2zyhtg9oPPCskOYu_koDLxEqirTQCwI_Xm_sK7fsc"
}
```
params:
```json
id: [integer]
````

Response:
status code(200)

```json
[
    {
      "message": "Delete Product Successfuly"
    }
]
```

JIKA ERROR
- VALIDASI 
: Response: status code(404)
```json
"Data Not Found"
```
: Response: status code(401)
```json
"NotAuthorize"
```
: Response: status code(400)
```json
"Validation error: Category must be create"
```
 
 ### GET /category :

Request:
headers : 

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ5b2dpQG1haWwuY29tIiwiaWF0IjoxNjA0NDExNjI5fQ.vk2zyhtg9oPPCskOYu_koDLxEqirTQCwI_Xm_sK7fsc"
}
```

Response:
status code(201)

```json
[
    {
        "id": 3,
        "name": "Handphone & Accessories",
        "createdAt": "2020-11-09T08:49:38.448Z",
        "updatedAt": "2020-11-09T08:49:38.448Z",
        "Products": [
            {
                "id": 13,
                "name": "Samsung galaxy fold 2",
                "image_url": "https://cdn-asset.jawapos.com/wp-content/uploads/2020/04/HP-samsung-terbaru-420x323.jpg",
                "price": 15000000,
                "stock": 2,
                "CategoryId": 3,
                "createdAt": "2020-11-12T10:44:53.933Z",
                "updatedAt": "2020-11-12T10:44:53.933Z"
            }
        ]
    }
]
```
 ### GET /productCustomer :

Request:
headers : 

```json
```

Response:
status code(201)

```json
[
    {
        "id": 13,
        "name": "Samsung galaxy fold 2",
        "image_url": "https://cdn-asset.jawapos.com/wp-content/uploads/2020/04/HP-samsung-terbaru-420x323.jpg",
        "price": 15000000,
        "stock": 2,
        "CategoryId": 3,
        "createdAt": "2020-11-12T10:44:53.933Z",
        "updatedAt": "2020-11-12T10:44:53.933Z",
        "Category": {
            "id": 3,
            "name": "Handphone & Accessories",
            "createdAt": "2020-11-09T08:49:38.448Z",
            "updatedAt": "2020-11-09T08:49:38.448Z"
        }
    }
]
```

### GET /cart :

Request:
headers : 

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ5b2dpQG1haWwuY29tIiwiaWF0IjoxNjA0NDExNjI5fQ.vk2zyhtg9oPPCskOYu_koDLxEqirTQCwI_Xm_sK7fsc"
}
```

Response:
status code(201)

```json
{
    "id": 2,
    "email": "user@mail.com",
    "password": "$2a$10$s3yKq7Qy7qzzLY.jW.ka5.CAol7JDznGDEfwgMapFDjlSGTb1IIVu",
    "role": "user",
    "createdAt": "2020-11-09T08:50:20.454Z",
    "updatedAt": "2020-11-09T08:50:20.454Z",
    "Products": [
        {
            "id": 7,
            "name": "Baju muslim anak",
            "image_url": "https://id.360buyimg.com/Indonesia/s880x0_/nHBfsgAArQAAABAAQyO6RgABT4A.jpg.dpg.webp",
            "price": 250000,
            "stock": 5,
            "CategoryId": 11,
            "createdAt": "2020-11-12T01:44:09.736Z",
            "updatedAt": "2020-11-12T01:44:09.736Z",
            "Cart": {
                "UserId": 2,
                "ProductId": 7,
                "quantity": 5,
                "status": "keranjang",
                "createdAt": "2020-11-19T06:43:41.076Z",
                "updatedAt": "2020-11-19T06:43:55.322Z"
            }
        },
        {
            "id": 1,
            "name": "Kemeja Pria",
            "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2017/2/26/16625804/16625804_67246b25-6ae2-461d-9430-65c43ae4fd93_800_800.png",
            "price": 150000,
            "stock": 10,
            "CategoryId": 7,
            "createdAt": "2020-11-09T08:59:59.512Z",
            "updatedAt": "2020-11-09T08:59:59.512Z",
            "Cart": {
                "UserId": 2,
                "ProductId": 1,
                "quantity": 13,
                "status": "keranjang",
                "createdAt": "2020-11-19T06:08:13.152Z",
                "updatedAt": "2020-11-19T07:17:41.767Z"
            }
        }
    ]
}
```
JIKA ERROR
- VALIDASI 
: Response: status code(400)
```json
{
    "message": "access_token is required"
}
```



### GET /cart/:id :

Request:
params:
```json
id: [integer]
```
headers : 

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ5b2dpQG1haWwuY29tIiwiaWF0IjoxNjA0NDExNjI5fQ.vk2zyhtg9oPPCskOYu_koDLxEqirTQCwI_Xm_sK7fsc"
}
```

Response:
status code(201)

```json
{
    "UserId": 2,
    "ProductId": 7,
    "quantity": 5,
    "status": "keranjang",
    "createdAt": "2020-11-19T06:43:41.076Z",
    "updatedAt": "2020-11-19T06:43:55.322Z",
    "Product": {
        "id": 7,
        "name": "Baju muslim anak",
        "image_url": "https://id.360buyimg.com/Indonesia/s880x0_/nHBfsgAArQAAABAAQyO6RgABT4A.jpg.dpg.webp",
        "price": 250000,
        "stock": 5,
        "CategoryId": 11,
        "createdAt": "2020-11-12T01:44:09.736Z",
        "updatedAt": "2020-11-12T01:44:09.736Z"
    }
}
```
JIKA ERROR
- VALIDASI 
: Response: status code(400)
```json
{
    "message": "access_token is required"
}
```

### POST /cart :

Request:
body:
```json
ProductId: [integer]
```
headers : 

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ5b2dpQG1haWwuY29tIiwiaWF0IjoxNjA0NDExNjI5fQ.vk2zyhtg9oPPCskOYu_koDLxEqirTQCwI_Xm_sK7fsc"
}
```

Response:
status code(201)

```json
{
    "UserId": 2,
    "ProductId": 7,
    "quantity": 5,
    "status": "keranjang",
    "createdAt": "2020-11-19T06:43:41.076Z",
    "updatedAt": "2020-11-19T06:43:55.322Z",
    "Product": {
        "id": 7,
        "name": "Baju muslim anak",
        "image_url": "https://id.360buyimg.com/Indonesia/s880x0_/nHBfsgAArQAAABAAQyO6RgABT4A.jpg.dpg.webp",
        "price": 250000,
        "stock": 5,
        "CategoryId": 11,
        "createdAt": "2020-11-12T01:44:09.736Z",
        "updatedAt": "2020-11-12T01:44:09.736Z"
    }
}
```
JIKA ERROR
- VALIDASI 
: Response: status code(400)
JIKA ERROR
```json
{
    "message": "access_token is required"
}
{ 
    "message": "stock tidak cukup"
}
"Validation error: input must be greater than 1"
```

### DELETE /cart :

Request:
body:
```json
ProductId: [integer]
```
headers : 

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ5b2dpQG1haWwuY29tIiwiaWF0IjoxNjA0NDExNjI5fQ.vk2zyhtg9oPPCskOYu_koDLxEqirTQCwI_Xm_sK7fsc"
}
```

Response:
status code(201)

```json
{"message": "Cart success Deleted"}

```

JIKA ERROR
- VALIDASI 
: Response: status code(400)
```json
{
    "message": "access_token is required"
}
```

### PATCH /cart :

Request:
body:
```json
{
    "ProductId": [integer],
    "quantity": [integer]
}

```
headers : 

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ5b2dpQG1haWwuY29tIiwiaWF0IjoxNjA0NDExNjI5fQ.vk2zyhtg9oPPCskOYu_koDLxEqirTQCwI_Xm_sK7fsc"
}
```

Response:
status code(201)

```json
{
    "UserId": 2,
    "ProductId": 7,
    "quantity": 5,
    "status": "keranjang",
    "createdAt": "2020-11-19T06:43:41.076Z",
    "updatedAt": "2020-11-19T06:43:55.322Z",
    "Product": {
        "id": 7,
        "name": "Baju muslim anak",
        "image_url": "https://id.360buyimg.com/Indonesia/s880x0_/nHBfsgAArQAAABAAQyO6RgABT4A.jpg.dpg.webp",
        "price": 250000,
        "stock": 5,
        "CategoryId": 11,
        "createdAt": "2020-11-12T01:44:09.736Z",
        "updatedAt": "2020-11-12T01:44:09.736Z"
    }
}
```

JIKA ERROR
- VALIDASI 
: Response: status code(400)
```json
"Validation error: Qty must be input",
"Validation error: input must be greater than 1"
{ 
    "message": "stock tidak cukup"
}
```