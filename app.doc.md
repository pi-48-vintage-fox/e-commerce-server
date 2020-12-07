# E-COMMERCE CMS
Aplikasi e-commerce adalah aplikasi untuk mengatur sisi admin item. Aplikasi ini memiliki : 

&nbsp;

## RESTful endpoints
### POST /task
### GET /product
### PUT /product/:id
### DELETE /product/:id
### POST /login
### POST /register

&nbsp;

#### POST /product
> Create New Asset

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json

{
    "name" : "backpack",
    "image_url" : "https://imgur.com/gallery/TVIMJX8",
    "price" : 10000,
    "stock" : 20 ,
}


```

_Response (201)_
```json

  {
    "id" : 1,
    "name" : "backpack",
    "image_url" : "https://imgur.com/gallery/TVIMJX8",
    "price" : 10000,
    "stock" : 20 ,
  },
  

```

_Response (400 - Invalid Input)_
```
{
  "message": "Invalid validation errors"
}
```

_Response (500 - Bad Request)_
```
{
  "message": "Server Errors"
}
```



### GET /product
> Get all Asset

_Request Header_
```
{
  "access_token": "<your access token>"
}
```



_Response (200)_
```json
[
  {
    "id" : 1,
    "name" : "tas",
    "image_url" : "https://imgur.com/gallery/TVIMJX8",
    "price" : 10000,
    "stock" : 20 ,
  },
  {
    "id" : 2,
    "name" : "smartphone",
    "image_url" : "https://imgur.com/gallery/AeJzgAt",
    "price" : 12000,
    "stock" : 20 ,
  },
  {
    "id" : 3,
    "name" : "sepatu",
    "image_url" : "https://imgur.com/gallery/LmF6t3T",
    "price" : 15000,
    "stock" : 20 ,
  },
  {
    "id" : 4,
    "name" : "laptop",
    "image_url" : "https://imgur.com/gallery/xeHDB",
    "price" : 18000,
    "stock" : 20 ,
  },
  {
    "id" : 5,
    "name" : "baju",
    "image_url" : "https://imgur.com/gallery/wgUauqj",
    "price" : 18000,
    "stock" : 20 ,
  },
]

```

_Response (500 - Bad Request)_
```json
{
  "message": "Server Errors"
}
```


#### PUT /product/:id
> Edit Asset by Id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json

{
    "name" : "tas",
    "image_url" : "https://imgur.com/gallery/TVIMJX8",
    "price" : 10000,
    "stock" : 20 ,
},

```

_Response (200)_
```json

  {
    "id" : "1",
    "name" : "tas",
    "image_url" : "https://imgur.com/gallery/TVIMJX8",
    "price" : 10000,
    "stock" : 20 ,
  },
  

```

_Response (400 - Invalid Input)_
```json
{
  "message": "Invalid validation errors"
}
```
_Response (404 - not found)_
```json
{
  "message": "error not found"
}
```

_Response (500 - Bad Request)_
```json
{
  "message": "Server Error"
}
```


#### DELETE /product/:id
> Delete Asset by Id
_Request Header_
```
{
  "access_token": "<your access token>"
}
```


_Response (200)_
```json

  {
    "message" : "delete success"
  },
  

```

_Response (400 - Invalid Input)_
```json
{
  "message": "Invalid validation errors"
}
```
_Response (404 - not found)_
```json
{
  "message": "error not found"
}
```

_Response (500 - Bad Request)_
```json
{
  "message": "Server Error"
}
```

--


---
#### POST /login

> Login to App

_Request Body_
```json

{
    "email" : "<your_email>",
    "password":"<your_password>"  
}

```

_Response (200)_
```json

{
    "accesToken" : "<your access token>"
},


```

_Response (400 )_
```json
{
  "message": "error"
}
```

--


---
#### POST /register

> Login to App

_Request Body_
```json

{
    "name" : "<your_name>"
    "email" : "<your_email>",
    "password":"<your_password>"  
}

```

_Response (200)_
```json

{
    "id" : "<your_id>",
    "email" : "<your_email>"
},


```

_Response (400 )_
```json
{
  "message": "error"
}
```


```



