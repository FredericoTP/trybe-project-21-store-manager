const validName = "ProductX";

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
  name: validName
}

const updatedProduct = {
  id: 1,
  name: validName
}

module.exports = {
  allProducts,
  newProduct,
  updatedProduct,
}