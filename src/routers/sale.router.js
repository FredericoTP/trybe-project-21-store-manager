const express = require('express');
const { saleController } = require('../controllers');
// const { validateNewSaleProduct } = require('../middlewares');

const router = express.Router();

router.get('/', saleController.findAll);

// router.post('/', validateNewSaleProduct, saleController.insertSaleProduct);

router.get('/:id', saleController.findById);

module.exports = router;