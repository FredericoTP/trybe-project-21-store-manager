const snakeize = require('snakeize');
const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const query = `SELECT a.id AS saleId, a.date, b.product_id AS productId, b.quantity 
  FROM StoreManager.sales AS a
  INNER JOIN StoreManager.sales_products AS b
  ON a.id = b.sale_id`;

  const [result] = await connection.execute(
    query,
  );

  return result;
};

const findById = async (id) => {
  const query = `SELECT a.date, b.product_id AS productId, b.quantity 
  FROM StoreManager.sales AS a
  INNER JOIN StoreManager.sales_products AS b
  ON a.id = b.sale_id
  WHERE a.id = ?`;

  const [result] = await connection.execute(
    query, [id],
  );

  return result;
};

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
  const query = `SELECT product_id, quantity 
  FROM StoreManager.sales_products
  WHERE sale_id = ?
  ORDER BY product_id`;

  const [result] = await connection.execute(
    query, [saleId],
  );

  return camelize(result);
};

const removeSaleById = async (saleId) => {
  const query = `DELETE StoreManager.sales, StoreManager.sales_products
  FROM StoreManager.sales
  JOIN StoreManager.sales_products
  ON StoreManager.sales.id = StoreManager.sales_products.sale_id
  WHERE StoreManager.sales.id = ?`;

  const result = await connection.execute(
    query, [saleId],
  );

  return result;
};

const updateSaleById = async (saleId, oldSale, sale) => {
  const columns = Object.keys(snakeize(sale)).map((key) => `${key} = ?`).join(', ');

  const query = `UPDATE StoreManager.sales_products
  SET ${columns} WHERE sale_id = ? AND product_id = ? AND quantity = ?`;

  const result = await connection.execute(
    query, [...Object.values(sale), saleId, oldSale.productId, oldSale.quantity],
  );

  return result;
};

module.exports = {
  findAll,
  findById,
  insertSale,
  insertSaleProduct,
  findSaleProductById,
  removeSaleById,
  updateSaleById,
};