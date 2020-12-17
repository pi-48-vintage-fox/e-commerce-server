npx sequelize db:create --env test

npx sequelize db:migrate:undo:all --env test

npx sequelize db:migrate --env test

NODE_ENV=test npx sequelize db:seed:all