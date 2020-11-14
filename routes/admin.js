const router = require('express').Router()
const AdminControllers = require('../controllers/admin_controllers')

router.post('/login', AdminControllers.loginAdmin)
router.post('/register', AdminControllers.register)

module.exports = router