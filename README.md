
# E-Commerce-CMS\

**Login**
--
Login user
*  **URL**

	/login

  

*  **Method**

`POST`

*  **Data Params**
```
{
email: admin@gmail.com,
password: 1234
}
```

*  **Success Response:**
*  **Code:** 200(OK)
	**Content:**
`
{
access_token : ""
}
`


*  **Error Response:**

*  **Code:** 401(Unauthorized)
	*  **Content:**  `{ error : "Email or Password wrong" }`
	*  **Code:** 500 (Internal Server Error )

**Register**
--
Login user
*  **URL**

	/register

*  **Method**

`POST`

*  **Data Params**
```
{
email: er@gmail.com,
password: 1234
}
```

*  **Success Response:**
*  **Code:** 201(created)
	**Content:**
`
{
message : "success register an account"
}
`


*  **Error Response:**

*  **Code:** 401(Unauthorized)
	*  **Content:**  `{ error : "Email or Password wrong" }`
	*  **Code:** 500 (Internal Server Error )


  
**Add Product**
--

Add a product task list
*  **URL**
/product

*  **Method**
`POST`

*  **Header**

`access_token: string`

*  **Data Params**
```
{
name:"compass",

image_url:"1.jpeg",

price:"100000",

stock:"10",
}
```

*  **Success Response:**

*  **Code:** 201 (CREATED)

**Content:**
```
{
name:"compass",

image_url:"1.jpeg",

price:"100000",

stock:"10",
}
```
*  **Error Response:**
*  **Code:** 400 (Bad request)
*  **Content:**  `{ error : "Validation Errors" }`
*  **Code:** 500 (Internal Server Error )

**Show All Product**
--

Show all Product list data

*  **URL**

/Product
*  **Method**
`GET`
*  **Header**
`access_token: string`

*  **Success Response:**
*  **Code:** 200 (OK)
**Content:**
```
[
{
name:"compass",

image_url:"1.jpeg",

price:"100000",

stock:"10",
},

{

name:"compass low",

image_url:"2.jpeg",

price:"100000",

stock:"10",

},
]
```
*  **Error Response:**
*  **Code:** 500 (Internal Server Error )

  

**Edit Product**
--

Edit a product list
*  **URL**

```
/product/:id
```

*  **Method:**

`PUT`

 
*  **Header**

`access_token: string`

*  **URL Params**
```
/:id
```

*  **Required:**

```
id=[integer]
```

**Data Params**

```
{
name:"compass",

image_url:"1.jpeg",

price:"100000",

stock:"10",
}
```
-  **Success Response:**

-  **Code:** 200(OK)

**Content:**
```
{
name:"compass",

image_url:"1.jpeg",

price:"100000",

stock:"10",
}
```
*  **Error Response:**
	*  **Code:** 400 (Bad request)
		*  **Content:**  `{ error : "Validation Errors" }`
	*  **Code:** 404 (Not Found)
		*  **Content:**  `{ error : "Not Found" }`
	*  **Code:** 500 (Internal server error)

**Delete Product**
--
Delete Product list

*  **URL**
```
/product/:id
```

*  **Method:**

`DELETE`

*  **Header**

`access_token: string`

*  **URL Params**

```
/:id
```
*  **Required:**
```
id=integer
```
*  **Data Params**
```
{
id : 1,

}
```

*  **Success Response:**

*  **Code:** 200(OK)

**Content:**

`Product was successfully deleted`

 
*  **Error Response:**

*  **Code:** 404 (Not Found)

**Content:**  `{ error : "Not found" }`

*  **Code:** 500 (Internal Server Error )


**Show All Product in cart**
--

Show all Product list data in cart

*  **URL**
/Cart/Product

*  **Method**
`GET`

*  **Header**
`access_token: string`

*  **Success Response:**
*  **Code:** 200 (OK)
**Content:**
```
[
{

"id": 1,

"name": "compass high vintage",

"image_url": "https://ecs7.tokopedia.net/img/cache/700/VqbcmM/2020/8/25/1c8c38d2-83a3-4a29-8944-9134f986aeb9.jpg",

"price": 100000,

"stock": 10,

"createdAt": "2020-11-11T16:58:30.230Z",

"updatedAt": "2020-11-14T10:07:23.835Z"

}
]
```
*  **Error Response:**
*  **Code:** 500 (Internal Server Error )


**Show All Cart**
--

Show all Cart list data

*  **URL**
/Cart

*  **Method**
`GET`

*  **Header**
`access_token: string`

*  **Success Response:**
*  **Code:** 200 (OK)
**Content:**
```
[

{

"UserId": 6,

"ProductId": 1,

"qty": 2,

"status": "unpaid",

"createdAt": "2020-11-19T04:06:02.121Z",

"updatedAt": "2020-11-19T04:06:04.758Z",

"Product": {

	"id": 1,

	"name": "compass high vintage",
	
	"image_url": "https://ecs7.tokopedia.net/img/cache/700/VqbcmM/2020/8/25/1c8c38d2-83a3-4a29-8944-9134f986aeb9.jpg",

	"price": 100000,

	"stock": 10,

	"createdAt": "2020-11-11T16:58:30.230Z",

	"updatedAt": "2020-11-14T10:07:23.835Z"

}

},

{

"UserId": 6,

"ProductId": 9,

"qty": 1,

"status": "unpaid",

"createdAt": "2020-11-19T04:06:06.301Z",

"updatedAt": "2020-11-19T04:06:06.301Z",

	"Product": {

	"id": 9,

	"name": "compass low vintage",

	"image_url": "https://sepatucompass.com/wp-content/uploads/2020/01/WEB-FOTO-VINTAGE-PRODUK-BLACK-LOW.jpg",

	"price": 150000,

	"stock": 10,

	"createdAt": "2020-11-18T23:04:59.193Z",

	"updatedAt": "2020-11-18T23:04:59.193Z"

}

}

]

```
*  **Error Response:**
*  **Code:** 500 (Internal Server Error )
* 
**Add Cart**
--

Add a Cart list
*  **URL**
/cart/:id

*  **URL PARAMS**
/:id

*  **Method**
`POST`

*  **Header**

`access_token: string`

*  **Data Params**
```
{
"UserId": 6,
"ProductId": 9,
"qty": 2,
"status": "unpaid",
"createdAt": "2020-11-19T04:06:06.301Z",
"updatedAt": "2020-11-19T04:29:04.119Z"
}
```

*  **Success Response:**

*  **Code:** 201 (CREATED)

**Content:**
```
{
"UserId": 6,
"ProductId": 9,
"qty": 2,
"status": "unpaid",
"createdAt": "2020-11-19T04:06:06.301Z",
"updatedAt": "2020-11-19T04:29:04.119Z"
}
```
*  **Error Response:**
*  **Code:** 400 (Bad request)
*  **Content:**  `{ error : "Validation Errors" }`
*  **Code:** 500 (Internal Server Error )

**Edit Cart**
--

Edit a cart list
*  **URL**

```
/cart/:id
```

*  **Method:**

`PATCH`

 
*  **Header**

`access_token: string`

*  **URL Params**
```
/:id
```

*  **Required:**

```
id=[integer]
```

**Data Params**

```
{
qty: '1'
}
```
-  **Success Response:**

-  **Code:** 200(OK)

**Content:**
```
{
message: 'update success'
}
```
*  **Error Response:**
	*  **Code:** 400 (Bad request)
		*  **Content:**  `{ error : "Validation Errors" }`
	*  **Code:** 404 (Not Found)
		*  **Content:**  `{ error : "Not Found" }`
	*  **Code:** 500 (Internal server error)

**Delete Cart**
--
Delete Cart list

*  **URL**
```
/cart/:id
```

*  **Method:**

`DELETE`

*  **Header**

`access_token: string`

*  **URL Params**

```
/:id
```
*  **Required:**
```
id=integer
```
*  **Data Params**
```
{
id : 1,

}
```

*  **Success Response:**

*  **Code:** 200(OK)

**Content:**

`delete succes`

 
*  **Error Response:**

*  **Code:** 404 (Not Found)

**Content:**  `{ error : "Not found" }`

*  **Code:** 500 (Internal Server Error )
