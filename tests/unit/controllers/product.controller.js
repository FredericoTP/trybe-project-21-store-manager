const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productController } = require('../../../src/controllers');
const { productService } = require('../../../src/services');
const { allProducts } = require('./mocks/product.controller.mock');

const { expect } = chai;
chai.use(sinonChai);

const INVALID_VALUE = 'INVALID_VALUE';
const PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND';
const REQUISITION_ERROR = 'REQUISITION_ERROR';

describe('Testes de unidade do controller product', function () {
  describe('Listando todos os produtos', function () {
    it('Deve retornar o status 200 e a lista de produtos', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'findAll').resolves({ type: null, message: allProducts });

      await productController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProducts);
    });

    it('Deve retornar um erro caso ocorra algo inesperado', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'findAll').resolves({ type: REQUISITION_ERROR, message: 'Something wrong heppened' });

      await productController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith('Something wrong heppened');
    });
  });

  describe('Listando um único produto', function () {
    it('Deve retornar o status 200 e o produto caso ele exista', async function () {
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'findById').resolves({ type: null, message: allProducts[0] });

      await productController.findById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProducts[0]);
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
      sinon.stub(productService, 'findById').resolves({ type: INVALID_VALUE, message: '"id" must be a number' });

      await productController.findById(req, res);

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
      sinon.stub(productService, 'findById').resolves({ type: PRODUCT_NOT_FOUND, message: 'Product not found' });

      await productController.findById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});