const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const querySchema = Joi.string().allow('').required();

const newProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const sale = Joi.object().keys({
  productId: idSchema.label('productId'),
  quantity: idSchema.label('quantity'),
});

const newSaleProductSchema = Joi.array().items(sale).required().messages({
  'any.required': '{{#label}} is required',
  'number.min': '{{#label}} must be greater than or equal to 1',
});

module.exports = {
  idSchema,
  querySchema,
  newProductSchema,
  newSaleProductSchema,
};