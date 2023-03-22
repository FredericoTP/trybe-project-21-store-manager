const snakeize = require('snakeize');
const camelize = require('camelize');
const connection = require('./connection');

const insertSale = async () => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUE (NOW())';
  const [{ insertId }] = await connection.execute(
    query,
  );

  return insertId;
};

const insertSaleProduct = async (saleId, sale) => {
  const columns = `sale_id, ${Object.keys(snakeize(sale)).join(', ')}`;
  const placeholders = `?, ${Object.keys(sale).map((_item) => '?').join(', ')}`;

  const query = `INSERT INTO StoreManager.sales_products (${columns}) VALUE (${placeholders})`;

  const [{ affectedRows }] = await connection.execute(
    query, [saleId, ...Object.values(sale)],
  );

  return affectedRows;
};

const findSaleProductById = async (saleId) => {
  const query = 'SELECT * FROM StoreManager.sales_products WHERE sale_id = ?';

  const [result] = await connection.execute(
    query, [saleId],
  );

  return camelize(result);
};

module.exports = {
  insertSale,
  insertSaleProduct,
  findSaleProductById,
};