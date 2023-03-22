const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { allProducts, newProduct, updateProduct } = require('./mocks/product.model.mock');

describe('Testes de unidade do model product', function () {
  it('Recupera a lista de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);

    const result = await productModel.findAll();

    expect(result).to.deep.equal(allProducts);
  });

  it('Recupera um item da lista de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([[allProducts[0]]]);

    const result = await productModel.findById(1);

    expect(result).to.deep.equal(allProducts[0]);
  });

  it('Cadastra um item na lista de produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

    const result = await productModel.insertProduct(newProduct);

    expect(result).to.be.equal(4);
  });

  it('Atualizando um produto', async function () {
    sinon.stub(connection, 'execute').resolves(updateProduct);

    const result = await productModel.updateProductById(1, newProduct);

    expect(result[0].affectedRows).to.be.deep.equal(1);
    expect(result[0].changedRows).to.be.deep.equal(1);
  });

  it('Remove um produto', async function () {
    sinon.stub(connection, 'execute').resolves(updateProduct);

    const result = await productModel.removeProductById(1);

    expect(result[0].affectedRows).to.be.deep.equal(1);
    expect(result[0].changedRows).to.be.deep.equal(1);
  });

  afterEach(function () {
    sinon.restore();
  });
});