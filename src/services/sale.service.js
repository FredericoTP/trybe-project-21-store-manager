const { saleModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const findAll = async () => {
  const sales = await saleModel.findAll();
  return { type: null, message: sales };
};

const findById = async (saleId) => {
  const error = schema.validateId(saleId);
  if (error.type) return error;

  const sale = await saleModel.findById(saleId);
  if (!sale[0]) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: sale };
};

const insertSaleProduct = async (sale) => {
  const error = schema.validateNewSaleProduct(sale);
  if (error.type) return error;

  const newSaleId = await saleModel.insertSale();

  await Promise.all(sale.map(
    async (item) => saleModel.insertSaleProduct(newSaleId, item),
  ));

  const saleProducts = await saleModel.findSaleProductById(newSaleId);

  const object = {
    id: newSaleId,
    itensSold: saleProducts,
  };

  return { type: null, message: object };
};

module.exports = {
  findAll,
  findById,
  insertSaleProduct,
};