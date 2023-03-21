const express = require('express');
const { productController } = require('../controllers');

const router = express.Router();

router.get('/', productController.findAll);

router.get('/:id', productController.findById);

module.exports = router;