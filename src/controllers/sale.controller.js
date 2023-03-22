const { saleService } = require('../services');
const errorMap = require('../utils/errorMap');

const insertSaleProduct = async (req, res) => {
  const sale = req.body;
  const { type, message } = await saleService.insertSaleProduct(sale);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json(message);
};

module.exports = {
  insertSaleProduct,
};