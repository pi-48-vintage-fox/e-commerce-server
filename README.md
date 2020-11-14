# e-commerce-server

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

id=[integer]

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