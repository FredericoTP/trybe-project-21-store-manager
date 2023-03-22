const { expect } = require('chai');
const sinon = require('sinon');
const { saleModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { newSale, newSaleProducts } = require('./mocks/sale.model.mock');

const SALE_ID = 3;

describe('Testes de unidade do model sale', function () {
  it('Cadastra uma nova venda', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);

    const result = await saleModel.insertSale();

    expect(result).to.be.equal(3);
  });

  it('Cadastra novos produtos vendidos', async function () {
    sinon.stub(connection, 'execute').resolves(newSaleProducts);

    const result = await saleModel.insertSaleProduct(SALE_ID, newSale);

    expect(result).to.be.deep.equal(2);
  });

  it('Retorna uma lista de produtos vendidos por ID', async function () {
    sinon.stub(connection, 'execute').resolves([[newSale[0]]]);

    const result = await saleModel.findSaleProductById(1);

    expect(result).to.deep.equal([newSale[0]]);
  });

  afterEach(function () {
    sinon.restore();
  });
});