const express = require('express');
const { productController } = require('../controllers');
const { validateNewProductField } = require('../middlewares');

const router = express.Router();

router.get('/', productController.findAll);

router.post('/', validateNewProductField, productController.insertProduct);

router.get('/:id', productController.findById);

router.put('/:id', validateNewProductField, productController.updateProductById);

router.delete('/:id', productController.removeProductById);

module.exports = router;