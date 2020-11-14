"use strict";

var router = require('express').Router();

var ProductCategoryController = require('../controllers/ProductCategoryController');

var authentication = require('../middlewares/authentication');

var _require = require('../middlewares/authorization'),
    isAdmin = _require.isAdmin;

router.get('/', authentication, ProductCategoryController.categories);
router.get('/:CategoryId', authentication, ProductCategoryController.findById);
router.post('/', authentication, isAdmin, ProductCategoryController.addCategory);
router.put('/:CategoryId', authentication, isAdmin, ProductCategoryController.putCategory);
router["delete"]('/:CategoryId', authentication, isAdmin, ProductCategoryController.deleteCategory);
module.exports = router;