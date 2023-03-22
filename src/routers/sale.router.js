const express = require('express');
const { saleController } = require('../controllers');
const { validateNewSaleProduct } = require('../middlewares');

const router = express.Router();

router.post('/', validateNewSaleProduct, saleController.insertSaleProduct);

module.exports = router;