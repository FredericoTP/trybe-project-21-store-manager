const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { saleController } = require('../../../src/controllers');
const { saleService } = require('../../../src/services');
const { allSales, saleById, saleInsert } = require('./mocks/sale.controller.mock');

const { expect } = chai;
chai.use(sinonChai);

const INVALID_VALUE = 'INVALID_VALUE';
const SALE_NOT_FOUND = 'SALE_NOT_FOUND';
const PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND';

describe('Testes de unidade do controller sale', function () {
  describe('Listando todos as vendas', function () {
    it('Deve retornar o status 200 e a lista de vendas', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'findAll').resolves({ type: null, message: allSales });

      await saleController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSales);
    });

    it('Retorna um erro caso ocorra algo inesperado', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'findAll').resolves({ type: 500, message: 'Server error' });

      await saleController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith('Server error');
    });
  });

  describe('Listando vendas por ID', function () {
    it('Deve retornar o status 200 e as vendas caso elas existam', async function () {
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'findById').resolves({ type: null, message: saleById });

      await saleController.findById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(saleById);
    });

    it('Deve retornar um erro caso o ID seja inválido', async function () {
      const req = {
        params: {
          id: 'a',
        },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'findById').resolves({ type: INVALID_VALUE, message: '"id" must be a number' });

      await saleController.findById(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"id" must be a number' });
    });

    it('Deve retornar um erro caso o ID não exista', async function () {
      const req = {
        params: {
          id: 999,
        },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'findById').resolves({ type: SALE_NOT_FOUND, message: 'Sale not found' });

      await saleController.findById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });

  describe('Deletando uma venda', function () {
    it('Deve retornar o status 204 ao deletar a venda com sucesso', async function () {
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'removeSaleById').resolves({ type: null, message: '' });

      await saleController.removeSaleById(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.json).to.have.been.calledWith('');
    });

    it('Deve retornar um erro caso o ID seja inválido', async function () {
      const req = {
        params: {
          id: 'a',
        },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'removeSaleById').resolves({ type: INVALID_VALUE, message: '"id" must be a number' });

      await saleController.removeSaleById(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"id" must be a number' });
    });

    it('Deve retornar um erro caso o ID não exista', async function () {
      const req = {
        params: {
          id: 999,
        },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'removeSaleById').resolves({ type: SALE_NOT_FOUND, message: 'Sale not found' });

      await saleController.removeSaleById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });

  describe('Cadastrando vendas', function () {
    it('Deve retornar o status 200 e as vendas cadastradas', async function () {
      const req = {
        body: [
          { productId: 1, quantity: 5 }
        ],
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'insertSaleProduct').resolves({ type: null, message: saleInsert });

      await saleController.insertSaleProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(saleInsert);
    });

    it('Deve retornar um erro caso o ID do produto não exista', async function () {
      const req = {
        body: [
          { productId: 999, quantity: 5 }
        ],
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'insertSaleProduct').resolves({ type: PRODUCT_NOT_FOUND, message: 'Product not found' });

      await saleController.insertSaleProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});