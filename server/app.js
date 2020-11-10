require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes/index')
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler')
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(routes)
app.use(errorHandler)
// app.listen(port, () => {
//     console.log(`E-commerce sever runing on http://localhost:${port}`)
// })

module.exports = app