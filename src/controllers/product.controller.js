const { productService } = require('../services');
const errorMap = require('../utils/errorMap');

const findAll = async (_req, res) => {
  const { type, message } = await productService.findAll();

  if (type) return res.status(errorMap.mapError(type)).json(message);

  return res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

const insertProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productService.insertProduct(name);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json(message);
};

const updateProductById = async (req, res) => {
  const product = req.body;
  const { id } = req.params;
  const { type, message } = await productService.updateProductById(id, product);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

const removeProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.removeProductById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(204).json('');
};

const findByQuery = async (req, res) => {
  const { q } = req.query;
  const { type, message } = await productService.findByQuery(q);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  findAll,
  findById,
  insertProduct,
  updateProductById,
  removeProductById,
  findByQuery,
};