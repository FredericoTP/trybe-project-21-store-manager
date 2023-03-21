const express = require('express');
const { productController } = require('../controllers');
const { validateNewProductField } = require('../middlewares');

const router = express.Router();

router.get('/', productController.findAll);

router.post('/', validateNewProductField, productController.insertProduct);

router.get('/:id', productController.findById);

module.exports = router;