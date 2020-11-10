if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()
}
const express = require('express')
const app = express()

// app.listen(port, () =>
//   console.log(`E-commerce CMS running at http://localhost:${port}`)
// )

module.exports = app
