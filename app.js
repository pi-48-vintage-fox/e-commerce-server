const express = require('express');
const app = express()
const routes = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)
app.use(errorHandler)


// app.listen(port, () => {
//     console.log("app listen on port " + port);
// })


module.exports = app
