const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { allProducts, newProduct } = require('./mocks/product.model.mock');

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

  afterEach(function () {
    sinon.restore();
  });
});