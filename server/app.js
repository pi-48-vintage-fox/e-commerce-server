if (process.env.NODE_ENV !== "production") {
  require('dotenv').config()
}
const cors = require('cors')
const express = require('express')
const routes = require('./routers/index')
const ErrorHandler = require('./middlewares/errorHandler')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)
app.use(ErrorHandler.errorHandler)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

module.exports = app
