# e-commerce-server

# **URL**

  | URL                | Method | PARAMS | DESCRIPTION                                                                   |
  | ------------------ | ------ | ------ | ----------------------------------------------------------------------------- |
  | /register          | POST   |        | REGISTER ACCOUNT                                                              |
  | /login             | POST   |        | LOGIN TO APPLICATION                                                          |
  | /products          | GET    |        | GET LIST PRODUCTS                                      |
  | /products          | POST   |        | ADD NEW PRODUCT                                                             |
  | /products/:id      | GET    | id     | GET SINGLE PRODUCT BY ID                                                    |
  | /products/:id      | PATCH  | id     | UPDATE SPESIFIC ATTRIBUTE IN PRODUCT |
  | /products/:id      | PUT    | id     | UPDATE ALL ATTRIBUTES PRODUCT                                                      |
  | /products/:id      | DELETE | id     | DELETE SINGLE PRODUCT BY ID                                                          |
  | /categories        | GET    |        | GET LIST CATEGORIES                                            |
  | /categories        | POST   | id     | ADD NEW CATEGORY                                                          |
  | /categories/:id    | DELETE | id     | DELETE SINGLE CATEGORY BY ID                                                          |
  | /checkout          | POST   |        | ADD CHECKOUT                                                          |
  | /banner            | GET    |        | GET LIST BANNER                                                          |
  | /banner            | POST   |        | ADD NEW BANNER                                                          |
  | /banner/:id        | PATCH  |        | UPDATE SPESIFIC ATTRIBUTE IN BANNER                                                          |
  | /banner/:id        | DELETE |        | DELETE SINGLE BANNER BY ID                                                          |
  | /USER/:id          | DELETE |        | DELETE USER BY ID                                                          |


# **Error Response**
  **Code: 200** <br/>
  **Content: { todo }**

  **Code: 400 BAD REQUEST**<br/>
  **Content: { error : "Validation" }**

  **Code: 404 NOT FOUND**<br/>
  **Content: { error : "SequelizeValidationError" }**

  **Code: 500 Internal Server Error**<br/>
  **Content: { error : "SequelizeValidationError" }**