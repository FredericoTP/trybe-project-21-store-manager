const { saleService } = require('../services');
const errorMap = require('../utils/errorMap');

const findAll = async (req, res) => {
  const { type, message } = await saleService.findAll();
  
  if (type) return res.status(errorMap.mapError(type)).json(message);

  return res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

const insertSaleProduct = async (req, res) => {
  const sale = req.body;
  const { type, message } = await saleService.insertSaleProduct(sale);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json(message);
};

module.exports = {
  findAll,
  insertSaleProduct,
  findById,
};