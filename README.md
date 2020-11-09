# E-Commerce-CMS

## Little application that allows  admin to create product and user as customer to buy the products

### RESTful endpoints

* ### POST/admin/products

> Create the products

_Request Header_

``` 
{
  "access_token": "<your access token>"
}
```

_Request Body_

``` 
{
    "name" : <product_name>,
    "image_url" : <image_url>,
    "price" : <price>,
    "stock" : <stock>
}
```

_Response (201)_ : CREATED
```
{
  "id": <given id by system>,
  "name": "<posted name>",
  "image_url": "<posted image_url>",
  "price": "<posted price>"
  "stock": "<posted stock>"
  "createdAt": "<given time by sistem>",
  "updatedAt": "<given time by sistem>",
}
```

_Response (400 - Bad Request)_
```
{
  "message" : "Invalid request"
}
```

_Response (500 - Internal Server error)_
``` 
{
  "message": "Internal server error"
}
```

* ### GET/admin/products

> Show all the products

_Request Header_

``` 
{
  "access_token": "<your access token>"
}
```

_Request Body_

``` 
not needed
```

_Response (200)_ : OK

``` 
[
 c
  {
      "name" : <product_name>,
      "image_url" : <image_url>,
      "price" : <price>,
      "stock" : <stock>
  },
]
```

_Response (400 - Bad Request)_

``` 
{
  "message": "Invalid request"
}
```
_Response (500 - Internal Server error)_

``` 
{
  "message": "Internal server error"
}
```

---

* ### PUT/admin/products
>The owner can edit the products which has been created
_Request Header_

``` 
{
  "access_token": "<your access token>"
}
```

_Request Body_

``` 
{
  "name" : <current_product_name>,
  "image_url" : <current_image_url>,
  "price" : <current_price>,
  "stock" : <current_stock>
}
```

_Response (200)_ : OK

``` 
[
  {
      "name" : <updated_product_name>,
      "image_url" : <updated_image_url>,
      "price" : <updated_price>,
      "stock" : <updated_stock>
  },
]
```

_Response (400 - Bad Request)_

``` 
{
  "message": "Invalid request"
}
```

_Response (401 - Unauthorized)_

``` 
{
  "message": "You are unauthorized"
}
```
_Response (500 - Internal Server error)_

``` 
{
  "message": "Internal server error"
}
```

---


* ### DELETE/admin/products
>The owner can delete the products which has been created

_Request Header_

``` 
{
  "access_token": "<your access token>"
}
```

_Response (200)_ : OK

``` 
[
  {
    "message" : "Product success to be deleted"
  },
]
```

_Response (400 - Bad Request)_

``` 
{
  "message": "Invalid request"
}
```

_Response (401 - Unauthorized)_

``` 
{
  "message": "You are unauthorized"
}
```

_Response (404 - Data not found)_

``` 
{
  "message": "Data not found"
}
```
_Response (500 - Internal Server error)_

``` 
{
  "message": "Internal server error"
}
```

---

* ### POST/login
> login into application

_Request Body_

``` 
{
  "email": "<user_email>"
  "password": "<user_password>"
}
```

_Response (201)_ : CREATED

``` 
[
  {
    "access_token" : "<generated_access_token>"
    "full_name" : "<registered full_name>"
  },
]
```

_Response (401 - Unauthorized)_

``` 
{
  "message": "Invalid email or password"
}
```

_Response (404 - Data not found)_

``` 
{
  "message": "Invalid email or password"
}
```
_Response (500 - Internal Server error)_

``` 
{
  "message": "Internal server error"
}
```