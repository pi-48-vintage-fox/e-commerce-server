const router = require('express').Router()
const Controller = require('../controllers/controller')
const authentication = require('../middlewares/authentication')

router.post('/login', Controller.login)

router.get('/products', Controller.show)

router.use(authentication)
router.post('/products', Controller.create)
router.put('/products/:id', Controller.update)
router.delete('/products/:id', Controller.delete)

module.exports = router