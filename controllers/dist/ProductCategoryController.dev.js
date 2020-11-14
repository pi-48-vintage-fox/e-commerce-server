"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../models'),
    ProductCategory = _require.ProductCategory,
    Product = _require.Product;

var ProductCategoryController =
/*#__PURE__*/
function () {
  function ProductCategoryController() {
    _classCallCheck(this, ProductCategoryController);
  }

  _createClass(ProductCategoryController, null, [{
    key: "categories",
    value: function categories(req, res, next) {
      console.log('getting categories');
      ProductCategory.findAll().then(function (categories) {
        res.status(200).json(categories);
      })["catch"](function (err) {
        console.log(err);
        next(err);
      });
    }
  }, {
    key: "findById",
    value: function findById(req, res, next) {
      console.log('getting category details:', req.params.id);
      ProductCategory.findByPk(req.params.id).then(function (category) {
        res.status(200).json(category);
      })["catch"](function (err) {
        console.log(err);
        next(err);
      });
    }
  }, {
    key: "addCategory",
    value: function addCategory(req, res, next) {
      var _req$body = req.body,
          name = _req$body.name,
          parentId = _req$body.parentId;
      var input = {
        name: name,
        parentId: parentId
      }; // const category = await ProductCategory.findOne({
      //   where: {
      //     name: input.name,
      //     parentId: input.parentId,
      //   },
      // })
      // if (category) {
      //   throw {
      //     status: 409,
      //     msg:
      //       'Category with the same name already exists, please choose another name',
      //   }
      // } else {

      if (parentId) {
        ProductCategory.findByPk(parentId).then(function (result) {
          console.log();

          if (!result) {
            throw {
              status: 404,
              msg: 'Product category not found'
            };
          }
        })["catch"](function (err) {
          console.log(err);
          next(err);
        });
      } else {
        ProductCategory.create(input).then(function (category) {
          res.status(201).json(category);
        })["catch"](function (err) {
          console.log(err);
          next(err);
        });
      }
    }
  }, {
    key: "deleteCategory",
    value: function deleteCategory(req, res, next) {
      console.log(req.params, '<<<< req params delete category controller');
      ProductCategory.destroy({
        where: {
          id: req.params.CategoryId
        }
      }).then(function (result) {
        if (result === 0) {
          throw {
            status: 404,
            msg: 'Category was not found'
          };
        }

        res.status(200).json({
          msg: 'Category was deleted successfully'
        });
      })["catch"](function (err) {
        console.log(err);
        next(err);
      });
    }
  }, {
    key: "putCategory",
    value: function putCategory(req, res, next) {
      console.log(req.body, '<<<<<<<<<< putCategory');
      var input = {};

      for (var key in req.body) {
        if (req.body[key]) {
          input[key] = req.body[key];
        }
      }

      ProductCategory.update(input, {
        where: {
          id: req.params.CategoryId
        }
      });
      res.status(200).json({
        msg: 'Category was modified successfully'
      })["catch"](function (err) {
        console.log(err);
        next(err);
      });
    }
  }]);

  return ProductCategoryController;
}();

module.exports = ProductCategoryController;