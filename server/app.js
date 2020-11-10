require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes')
const errorHandler = require('./middlewares/errorhandler')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)
app.use(errorHandler)

// app.listen(3000, () => {
//   console.log('app is running');
  
// })

module.exports = app