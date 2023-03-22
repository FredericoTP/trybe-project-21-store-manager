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

  const errorId = await schema.validateProductIdExists(sale);
  if (errorId.type) return errorId;

  const newSaleId = await saleModel.insertSale();

  await Promise.all(sale.map(
    async (item) => saleModel.insertSaleProduct(newSaleId, item),
  ));

  const saleProducts = await saleModel.findSaleProductById(newSaleId);

  const object = {
    id: newSaleId,
    itemsSold: saleProducts,
  };

  return { type: null, message: object };
};

const removeSaleById = async (saleId) => {
  const error = schema.validateId(saleId);
  if (error.type) return error;

  const checkProductExists = await saleModel.findById(saleId);
  if (!checkProductExists[0]) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  await saleModel.removeSaleById(saleId);

  return { type: null, message: '' };
};

const updateSaleById = async (saleId, sale) => {
  const error = schema.validateNewSaleProduct(sale);
  if (error.type) return error;

  const errorSaleId = await saleModel.findById(saleId);
  if (!errorSaleId[0]) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  
  const errorId = await schema.validateProductIdExists(sale);
  if (errorId.type) return errorId;

  const oldSale = await saleModel.findSaleProductById(saleId);

  await Promise.all(sale.map(
    async (item, index) => saleModel.updateSaleById(saleId, oldSale[index], item),
  ));

  const saleProducts = await saleModel.findSaleProductById(saleId);

  const object = {
    saleId,
    itemsUpdated: saleProducts,
  };

  return { type: null, message: object };
};

module.exports = {
  findAll,
  findById,
  insertSaleProduct,
  removeSaleById,
  updateSaleById,
};