const router = require('express').Router()
const Controllers = require('../controllers/userController')

router.post('/login', Controllers.login)
router.post('/register', Controllers.register)


module.exports = router 