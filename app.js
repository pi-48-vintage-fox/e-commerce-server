require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = require('./routers')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)

app.use(errorHandler)

// app.listen(port, () => {
//     console.log(`app listen on port ${port}`);
// })

module.exports = app