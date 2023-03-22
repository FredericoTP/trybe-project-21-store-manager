const validProduct = "ProductX";
const invalidProduct = "abcd";

const allProducts = [
  {
    id: 1,
    name: "Martelo de Thor"
  },
  {
    id: 2,
    name: "Traje de encolhimento"
  },
  {
    id: 3,
    name: "Escudo do Capitão América"
  }
];

const newProduct = {
  id: 4,
  name: validProduct
}

const productToUpdate = {
  name: validProduct
}

const invalidProductToUpdate = {
  name: invalidProduct
}

const updateProduct = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: 'Rows matched: 1  Changed: 1  Warnings: 0',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 1,
  },
  undefined,
]

const updatedProduct = {
  id: 1,
  ...productToUpdate
}

module.exports = {
  allProducts,
  newProduct,
  validProduct,
  invalidProduct,
  productToUpdate,
  updateProduct,
  updatedProduct,
  invalidProductToUpdate,
}