
const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes')
const PORT = process.env.PORT || 3000
const errorHandler = require('./middlewares/errorhandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log('app is running');
})

module.exports = app