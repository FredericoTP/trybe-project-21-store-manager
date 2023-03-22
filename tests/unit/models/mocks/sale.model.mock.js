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
  },
  {
    saleId: 2,
    date: "2021-09-09T04:55:35.000Z",
    productId: 1,
    quantity: 3
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

const newSale = [
  {
    productId: 1,
    quantity: 1
  },
  {
    productId: 2,
    quantity: 5
  }
]

const newSaleProducts = [
  {
    fieldCount: 0,
    affectedRows: 2,
    insertId: 0,
    info: 'Rows matched: 1  Changed: 1  Warnings: 0',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 2,
  },
  undefined,
]

module.exports = {
  newSale,
  newSaleProducts,
  allSales,
  saleById,
}