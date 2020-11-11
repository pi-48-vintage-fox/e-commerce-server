'use strict'
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./routes')
const errorHandlers = require('./middlewares/errorHandlers')
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(router)
app.use(errorHandlers)
app.listen(port, ()=> {
    console.log(`listening port ${port}`)
})
// module.exports = app