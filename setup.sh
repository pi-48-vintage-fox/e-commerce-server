# npx sequelize model:create --name User --attributes email:string,password:string,role:string,avatarUrl:string

# npx sequelize model:create --name Product --attributes name:string,description:string,imageUrl:string,imageId:string,price:integer,stock:integer,ProductCategoryId:integer

# npx sequelize model:create --name ProductCategory --attributes name:string,parentId:integer

# npx sequelize model:create --name Banner --attributes title:string,status:string,imageUrl:string,imageId:string

# npx sequelize seed:create --name seed-users
# npx sequelize seed:create --name seed-categories

# npx sequelize model:create --name Cart --attributes UserId:integer,status:string

# npx sequelize model:create --name CardProduct --attributes CardId:integer,ProductId:integer,quantity:integer

