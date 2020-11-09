npx sequelize model:create --name User --attributes email:string,password:string,role:string

npx sequelize model:create --name Product --attributes name:string,image_url:string,image_id:string,price:integer,stock:integer,ProductCategoryId:integer

npx sequelize model:create --name ProductCategory --attributes name:string,parentId:integer

npx sequelize model:create --name Banner --attributes title:string,status:string,image_url:string,image_id:string

npx sequelize seed:create --name seed-users
