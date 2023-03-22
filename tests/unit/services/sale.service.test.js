const { expect } = require('chai');
const sinon = require('sinon');
const { saleService } = require('../../../src/services');
const { saleModel } = require('../../../src/models');
const { allSales, saleById } = require('./mocks/sale.service.mock');

const INVALID_VALUE = 'INVALID_VALUE';

describe('Teste de unidade do service sale', function () {
  describe('Listagem de todas as vendas', function () {
    it('Retorna a lista de vendas', async function () {
      sinon.stub(saleModel, 'findAll').resolves(allSales);

      const result = await saleService.findAll();

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allSales);
    });
  });

  describe('Listagem de uma única venda', function () {
    it('Retorna uma única venda caso o ID exista', async function () {
      sinon.stub(saleModel, 'findById').resolves(saleById);

      const result = await saleService.findById(1);

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(saleById);
    });

    it('Retorna um erro caso o ID seja inválido', async function () {
      const result = await saleService.findById('a');

      expect(result.type).to.be.equal(INVALID_VALUE);
      expect(result.message).to.deep.equal('"id" must be a number');
    });

    it('Retorna um erro caso a venda não exista', async function () {
      sinon.stub(saleModel, 'findById').resolves([]);

      const result = await saleService.findById(999);

      expect(result.type).to.be.equal('SALE_NOT_FOUND');
      expect(result.message).to.deep.equal('Sale not found');
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});