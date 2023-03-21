const { productModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const findAll = async () => {
  const products = await productModel.findAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const error = schema.validateId(productId);
  if (error.type) return error;

  const product = await productModel.findById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

module.exports = {
  findAll,
  findById,
};