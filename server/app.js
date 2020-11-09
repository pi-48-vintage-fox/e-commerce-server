const express = require('express')
const app = express()
const routes = require('./routes/index')
const errorHandler = require('./middleware/errorHandler')
const port = process.env.PORT || 3000


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/', routes)
// app.listen(port, () => {
//     console.log(`E-commerce sever runing on http://localhost:${port}`)
// })
app.use(errorHandler)

module.exports = app