const snakeize = require('snakeize');
const connection = require('./connection');

const findAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [result] = await connection.execute(
    query,
  );

  return result;
};

const findById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [[result]] = await connection.execute(
    query, [id],
  );

  return result;
};

const insertProduct = async (product) => {
  const columns = Object.keys(product).join(', ');
  const placeholders = Object.keys(product).map((_item) => '?').join(', ');

  const query = `INSERT INTO StoreManager.products (${columns}) VALUE (${placeholders})`;

  const [{ insertId }] = await connection.execute(
    query, [...Object.values(product)],
  );

  return insertId;
};

const updateProductById = async (productId, product) => {
  const columns = Object.keys(snakeize(product)).map((key) => `${key} = ?`).join(', ');

  const query = `UPDATE StoreManager.products SET ${columns} WHERE id = ?`;
  const result = await connection.execute(
    query, [...Object.values(product), productId],
  );

  return result;
};

const removeProductById = async (productId) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';
  const result = await connection.execute(
    query, [productId],
  );

  return result;
};

module.exports = {
  findAll,
  findById,
  insertProduct,
  updateProductById,
  removeProductById,
};