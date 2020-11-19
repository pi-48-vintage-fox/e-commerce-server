# E-Commerce-CMS

## Little application that allows admin to create product and user as customer to buy the products

### RESTful endpoints

- ### POST/products

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

- ### GET/products

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

- ### PUT/products
  > The owner can edit the products which has been created
  > _Request Header_

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

- ### DELETE/products
  > The owner can delete the products which has been created

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

- ### POST/login
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

- ### POST/register

> register into application

_Request Body_

```
{
  "email": "<user_email>"
  "password": "<user_password>"
  "full_name": "<user_full_name>"
}
```

_Response (201)_ : OK

```
[
  {
    "email" : "<registered_email>"
    "full_name" : "<registered full_name>"
  },
]
```

_Response (400 - Bad Request)_

```
{
  "message": "You can't register with this format"
}
```

_Response (500 - Internal Server error)_

```
{
  "message": "Internal server error"
}
```

- ### GET /carts


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
      "ProductId" : <ID from product>,
      "UserId"    : <ID from user data>,
      "quantity"  : <Cart quantity>,
      "status"    : "New",
      "Product"   : {
        "id"      :  <ID from Product>
        "name"    :  <Product name>
        "stock"   :  <Product stock>
        "img_url" :  <Product image URL>
      }
  },
]
```

_Response (500 - Internal Server error)_

```
{
  "message": "Internal server error"
}
```
* ### POSTS /carts/:ProductId
  _Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
{
  "ProductId": "<ID from Product>"
}
```
_Response (201 - OK)_
```
   {
      "ProductId" : <ID from product>,
      "UserId"    : <ID from user data>,
      "quantity"  : <Cart quantity>,
      "status"    : "New",
      "Product"   : {
        "id"      :  <ID from Product>
        "name"    :  <Product name>
        "stock"   :  <Product stock>
        "img_url" :  <Product image URL>
      }
  },
```

_Response (500 - Internal Server error)_

```
{
  "message": "Internal server error"
}
```



- ### PATCH /carts/:ProductId
  _Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
{
  "ProductId": "<ID from Product>"
  "quantity": "<quantity>"
}
```

_Response (200)_ : OK

```
[
  {
      "quantity" : <updated_quantity>,
  },
]
```

_Response (400 - Bad Request -- < Updated quantity bigger than stock limit >)_

```
{
  "message": "Cart quantity has reached its limit"
},
```

_Response (400 - Bad Request -- < Updated quantity is less than 1 > )_

```
{
  "message": "Cart quantity cannot less than 0"
}
```

_Response (500 - Internal Server error)_

```
{
  "message": "Internal server error"
}
```

- ### DELETE /carts/:ProductId

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
{
  "ProductId": "<ID from Product>"
}
```
_Response (200)_ : OK

```
[
  {
    "message" : "Cart success to be deleted"
  },
]
```

_Response (500 - Internal Server error)_

```
{
  "message": "Internal server error"
}
```

