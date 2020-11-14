# API DOCUMENTATION 

List Endpoints :
- `POST /login`
- `GET /product`
- `POST /product`
- `PUT /product/:id`
- `PATCH /product/:id`
- `DELETE /product/:id`
- `GET /category`


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
 