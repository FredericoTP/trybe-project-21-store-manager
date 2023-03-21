const { expect } = require('chai');
const sinon = require('sinon');
const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models');
const { allProducts } = require('./mocks/product.service.mock');

describe('Testes de unidade do service product', function () {
  describe('Listagem de todos os produtos', function () {
    it('Retorna a lista de produtos', async function () {
      sinon.stub(productModel, 'findAll').resolves(allProducts);

      const result = await productService.findAll();

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allProducts);
    });
  });

  describe('Listagem de um único produto', function () {
    it('Retorna um único produto caso o ID exista', async function () {
      sinon.stub(productModel, 'findById').resolves(allProducts[0]);

      const result = await productService.findById(1);

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allProducts[0]);
    });

    it('Retorna um erro caso o ID seja inválido', async function () {
      const result = await productService.findById('a');

      expect(result.type).to.be.equal('INVALID_VALUE');
      expect(result.message).to.deep.equal('"id" must be a number');
    });

    it('Retorna um erro caso o produto não exista', async function () {
      sinon.stub(productModel, 'findById').resolves(undefined);

      const result = await productService.findById(999);
      expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.deep.equal('Product not found');
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});