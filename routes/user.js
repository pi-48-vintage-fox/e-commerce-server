const router = require('express').Router()
const UserControllers = require('../controllers/user_controllers')

router.post('/login', UserControllers.loginUser)
router.post('/register', UserControllers.register)

module.exports = router