const { saleModel } = require('../models');
const schema = require('./validations/validationsInputValues');

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
  insertSaleProduct,
};