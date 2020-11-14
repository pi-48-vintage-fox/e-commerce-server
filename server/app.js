const express = require("express")
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000
const routes = require("./routes")
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(routes)


app.listen(port,()=>{
    console.log(`app listen port ${port}`);
})

module.exports = app