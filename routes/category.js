const router = require('express').Router();
const CategoryController = require('../controllers/categoryController');

router.get('/', CategoryController.getCategories);
router.post('/', CategoryController.addCategory);

module.exports = router;