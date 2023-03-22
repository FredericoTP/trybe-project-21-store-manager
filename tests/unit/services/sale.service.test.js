const { expect } = require('chai');
const sinon = require('sinon');
const { saleService } = require('../../../src/services');
const { saleModel } = require('../../../src/models');
const {
  allSales,
  saleById,
  newInsertSale,
  insertSale,
  invalidSale1,
  invalidSale2,
  invalidSale3,
  invalidSale4,
} = require('./mocks/sale.service.mock');

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

  describe('Remoção de uma venda', function () {
    it('Retorna sucesso quando deleta uma venda', async function () {
      sinon.stub(saleModel, 'findById').resolves(saleById);
      sinon.stub(saleModel, 'removeSaleById').resolves();

      const result = await saleService.removeSaleById(1);

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal('');
    });

    it('Retorna um erro caso o ID seja inválido', async function () {
      const result = await saleService.removeSaleById('a');

      expect(result.type).to.be.equal(INVALID_VALUE);
      expect(result.message).to.deep.equal('"id" must be a number');
    });

    it('Retorna um erro caso o ID não exista', async function () {
      sinon.stub(saleModel, 'findById').resolves([]);

      const result = await saleService.removeSaleById(999);

      expect(result.type).to.be.equal('SALE_NOT_FOUND');
      expect(result.message).to.deep.equal('Sale not found');
    });
  });

  describe('Cadastro de vendas', function () {
    it('Retorna as vendas cadastradas', async function () {
      sinon.stub(saleModel, 'insertSale').resolves(3);
      sinon.stub(saleModel, 'insertSaleProduct').resolves(3, newInsertSale);
      sinon.stub(saleModel, 'findSaleProductById').resolves([newInsertSale]);

      const result = await saleService.insertSaleProduct([newInsertSale]);

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(insertSale);
    });

    it('Retorna um erro caso productId não exista', async function () {
      const result = await saleService.insertSaleProduct([invalidSale1]);

      expect(result.type).to.be.equal('BAD_REQUEST');
      expect(result.message).to.deep.equal('"productId" is required');
    });

    it('Retorna um erro caso quantity não exista', async function () {
      const result = await saleService.insertSaleProduct([invalidSale2]);

      expect(result.type).to.be.equal('BAD_REQUEST');
      expect(result.message).to.deep.equal('"quantity" is required');
    });

    it('Retorna um erro caso productId seja inválido', async function () {
      const result = await saleService.insertSaleProduct([invalidSale3]);

      expect(result.type).to.be.equal(INVALID_VALUE);
      expect(result.message).to.deep.equal('"productId" must be greater than or equal to 1');
    });

    it('Retorna um erro caso productId não seja encontrado', async function () {
      const result = await saleService.insertSaleProduct([invalidSale4]);

      expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.deep.equal('Product not found');
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});