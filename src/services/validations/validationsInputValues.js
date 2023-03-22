const {
  idSchema,
  querySchema,
  newProductSchema,
  newSaleProductSchema,
} = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);

  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  return { type: null, message: '' };
};

const validateQuery = (query) => {
  const { error } = querySchema.validate(query);

  if (error) return { type: 'INVALID_VALUE', message: '"query" must be a string' };

  return { type: null, message: '' };
};

const validateNewProduct = (name) => {
  const { error } = newProductSchema.validate({ name });

  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

const validateNewSaleProduct = (sale) => {
  const { error } = newSaleProductSchema.validate(sale);
  if (error) {
    if (error.message.includes('required')) return { type: 'BAD_REQUEST', message: error.message };
  
    if (error.message.includes('greater')) return { type: 'INVALID_VALUE', message: error.message };
  }

  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateQuery,
  validateNewProduct,
  validateNewSaleProduct,
};