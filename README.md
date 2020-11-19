
# e-commerce-server

  
*Register*

  

--

  

  

Register user

  

  

  

*  *URL*

  

  

  

		/register

  

  

*  *Method*

  

  

  

		POST

  

  

  

*  *Data Params*

  

  

		{
		email: <input email>,
		password: <input password>
		}

  

  

*  *Success Response:*

  

  

  

*  *Code:*

		200(OK)

  

  

*Content:*

  

  

	{
		email: admin@mail.com
	}

  

  

  

*  *Error Response:*

  

  

  

*  *Code:*

		401 (Unauthorized)

  

  

  

*  *Content:*

`{ error : "Email has been used" }`

  

  

  

*  *Code:*

500 (Internal Server Error )

  

  

<br>

  

<br>

  

  



*Login*

  

--

  

  

Login user

  

  

  

*  *URL*

  

  

  

		/login

  

  

*  *Method*

  

  

  

		POST

  

  

  

*  *Data Params*

  

  

		{
			email: admin@mail.com,
			password: 123456
		}

  

  

*  *Success Response:*

  

  

  

*  *Code:*

		200(OK)

  

  

*Content:*

  

  

	{
		email: admin@mail.com
	}

  

  

  

*  *Error Response:*

  

  

  

*  *Code:*

		401 (Unauthorized)

  

  

  

*  *Content:*

	`{ error : "Email or Password wrong" }`

  

  

  

*  *Code:*

		500 (Internal Server Error )

  

  

<br>

  

<br>

  

  

*Add Product*

  

--

  

  

  

Add a product list

  

  

  

*  *URL*

  

  

  

		/products

  

  

  

  

*  *Method*

  

  

  

		POST

  

  

  

*  *Header*

  

  

		access_token: <string>

  

  

  

*  *Data Params*

  

  

  

		{
			name : "<add name>",
			image_url: "<add image>",
			price: "<add price>",
			stock: "<add stock>"
		}

  

  

  

*  *Success Response:*

  

  

  

*  *Code:*

	`201 (created)`

  

  

  

*Content:*

  

  
  

	{
		id : "id"
		name : "name",
		image_url: "image",
		price: "price",
		stock: "stock"
	}

  

  

  

  

*  *Error Response:*

  

  

  

*  *Code:*

		400 (Bad request)

  

  

  

*  *Content:*

	`{ error : "Validation Errors" }`

  

  

  

*  *Code:*

		500 (Internal Server Error )

  

  

<br>

  

<br>

  

  

  

*Show All Products*

  

--

  

  

  

Show all product list data

  

  

  

  

*  *URL*

  

  

  

		/products

  

  

  

  

*  *Method*

  

  

  

		GET

  

  

  

*  *Header*

  

  

		access_token: <string>

  

  

  

*  *Success Response:*

  

  

  

*  *Code:*

		200 (OK)

  

  

  

*Content:*

  

	{
		name : "name",
		image_url: "image",
		price: "price",
		stock: "stock"
	}

  

*  *Error Response:*

  

*  *Code:* 
500 (Internal Server Error )

  

  

<br>

<br>

  

  

*Edit Products*

  

--

  

  

  

Edit a product list

  

  

  

*  *URL*

  

  

  

		/products/:id

  

  

  

  

*  *Method:*

  

  

  

  

		PUT

  

  

  

*  *Header*

  

  

		access_token: string

  

  

  

*  *URL Params*

  

  

		/products/:id

  

  

*  *Required:*

  

  

  

		id=[integer]

  

  

*Data Params*

  

	{
		name : "<edit name>",
		image_url: "<edit image>",
		price: "<edit price>",
		stock: "<edit stock>"
	}

  

-  *Success Response:*

  

  

  

-  *Code:*

		200(OK)

  

  

  

*Content:*

  

	{
		name : "name",
		image_url: "image",
		price: "price",
		stock: "stock"
	}

  
  

*  *Error Response:*

*  *Code:*

		400 (Bad request)

*  *Content:*

	`{ error : "Validation Errors" }`

  

  

  

*  *Code:*

		404 (Not Found)

  

  

  

*  *Content:*

		`{ error : "Not Found" }`

  

  

  

*  *Code:*

		500 (Internal server error)

  

  

<br>

  

<br>

  

  
  
  

*Delete Products*

  

--

  

  

Delete Product list

  

  

  

*  *URL*

  

  

		/products/:id

  

  

*  *Method:*

  

  

		DELETE

  

  

*  *Header*

  

  

		access_token: string

  

  

  

*  *URL Params*

  

  

		products/:id

  

  

*  *Required:*

  

  

		id=[integer]

  

  

*  *Data Params*

  

  

  

		{
			id : "<deleted id>",
		}

  

  

  

  

*  *Success Response:*

  

  

  

*  *Code:*

		200(OK)

  

  

  

*Content:*

	`Product was successfully deleted`

*  *Error Response:*

  

  

  

*  *Code:*

		404 (Not Found)

  

  

  

*Content:*

	`{ error : "Not found" }`

  

  

  

*  *Code:*

		500 (Internal Server Error )


<br>

<br>


Add a cart list

  

  

  

*  *URL*

  

  

  

		/carts/:id

  

  

  

  

*  *Method*

  

  

  

		POST

  

  

  

*  *Header*

  

  

		access_token: <string>

  

  

  

*  *Data Params*

  

  

  

		{
			UserId : "<add UserId>",
			ProductId: "<add ProductId>",
			quantity: 1,
			status: "false"
		}

  

  

  

*  *Success Response:*

  

  

  

*  *Code:*

	`201 (created)`

  

  

  

*Content:*

  

  
  

	{
		name : "Product name",
		image_url: "Product image",
		quantity: "quantity",
	}

  

  

  

  

*  *Error Response:*

  

  

  

*  *Code:*

		400 (Bad request)

  

  

  

*  *Content:*

	`{ error : "Validation Errors" }`

  

  

  

*  *Code:*

		500 (Internal Server Error )

  

  

<br>

  

<br>

*Show All Products*

  

--

  

  

  

Show all carts list data

  

  

  

  

*  *URL*

  

  

  

		/carts

  

  

  

  

*  *Method*

  

  

  

		GET

  

  

  

*  *Header*

  

  

		access_token: <string>

  

  

  

*  *Success Response:*

  

  

  

*  *Code:*

		200 (OK)

  

  

  

*Content:*

  

	{
		name : "name",
		image_url: "image",
		price: "price",
		quantity: "quantity"
	}

  

*  *Error Response:*

  

*  *Code:* 
500 (Internal Server Error )

  

  

<br>

<br>

Edit a carts quantity

  

  

  

*  *URL*

  

  

  

		/carts/:id

  

  

  

  

*  *Method:*

  

  

  

  

		PATCH

  

  

  

*  *Header*

  

  

		access_token: string

  

  

  

*  *URL Params*

  

  

		/carts/:id

  

  

*  *Required:*

  

  

  

		id=[integer]

  

  

*Data Params*

  

	{
		quantity: "<edit stock>"
	}

  

-  *Success Response:*

  

  

  

-  *Code:*

		200(OK)

  

  

  

*Content:*

  

	{
		name : "name",
		image_url: "image",
		price: "price",
		quantity: "<Edited quantity>"
	}

  
  

*  *Error Response:*

*  *Code:*

		400 (Bad request)

*  *Content:*

	`{ error : "Validation Errors" }`

  

  

  

*  *Code:*

		404 (Not Found)

  

  

  

*  *Content:*

		`{ error : "Not Found" }`

  

  

  

*  *Code:*

		500 (Internal server error)

  

  

<br>

  

<br>

Delete Cart list

  

  

  

*  *URL*

  

  

		/carts/:id

  

  

*  *Method:*

  

  

		DELETE

  

  

*  *Header*

  

  

		access_token: string

  

  

  

*  *URL Params*

  

  

		products/:id

  

  

*  *Required:*

  

  

		id=[integer]

  

  

*  *Data Params*

  

  

  

		{
			id : "<deleted id>",
		}

  

  

  

  

*  *Success Response:*

  

  

  

*  *Code:*

		200(OK)

  

  

  

*Content:*

	`Carts was successfully deleted`

*  *Error Response:*

  

  

  

*  *Code:*

		404 (Not Found)

  

  

  

*Content:*

	`{ error : "Not found" }`

  

  

  

*  *Code:*

		500 (Internal Server Error )


<br>

<br>

