# e-commerce-server
--------------------------
* **URL**

  `/user/login`

* **Description** <br />
`LOGIN USER`

* **Method:**
  
  `POST`

*  **URL Params**

   `none`

   **Required:**
 
   `none`

   **Optional:**
 
   `none`

* **Data Params**

  `request body`

    | Key       | Type | Description|Validation|
    |-----------|------|------------|----------|
    |password   |string|REQUIRED    |-
    |email      |string|REQUIRED    |unique
   

* **Success Response:**<br />
    `IF PAYLOAD SUITS VALIDATION RULE`
  * **Code:** 200 OK <br />
    **Content:** <br />
    ```javascript
    {
        "access_token": string,
        "name": string,
        "role":string
    }
    ```
 
* **Error Response:**

  `IF VALIDATION FAILS`

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "VALIDATION FAILS" }`

  OR

  * **Code:** 500 Internal Server Error <br />
    

* **Sample Call:**

  `none`

* **Notes:**

  `none`
--------------------------