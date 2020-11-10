if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()
}
const http = require('http')
const app = require('../app')
const port = process.env.PORT || 30001

app.set('port', port)

const server = http.createServer(app)

server.listen(port, () => {
  console.log(`E-commerce CMS is running at http://localhost:${port}`)
})
