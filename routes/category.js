const router = require('express').Router();
const CategoryController = require('../controllers/categoryController');

router.get('/', CategoryController.getCategories);
router.post('/', CategoryController.addCategory);
router.delete('/:id', CategoryController.deleteCategory);

module.exports = router;