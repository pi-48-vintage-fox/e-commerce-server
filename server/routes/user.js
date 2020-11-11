const router = require('express').Router()
const Controllers = require('../controllers/userController')

router.post('/login', Controllers.login)


module.exports = router 