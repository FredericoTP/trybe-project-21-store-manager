const allSales = [
  {
    saleId: 1,
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2
  },
  {
    saleId: 1,
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2
  }
]

const saleById = [
  {
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2
  },
  {
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2
  }
]

const newInsertSale = {
  productId: 2,
  quantity: 1,
}

const insertSale = {
  id: 3,
  itemsSold: [
    {
      productId: 2,
      quantity: 1
    }
  ]
}

const invalidSale1 = {
  quantity: 1
}

const invalidSale2 = {
  productId: 2
}

const invalidSale3 = {
  productId: 0,
  quantity: 1
}

const invalidSale4 = {
  productId: 999,
  quantity: 1
}

module.exports = {
  allSales,
  saleById,
  newInsertSale,
  insertSale,
  invalidSale1,
  invalidSale2,
  invalidSale3,
  invalidSale4,
}