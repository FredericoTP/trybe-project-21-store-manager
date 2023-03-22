module.exports = (req, res, next) => {
  const [sale] = req.body;

  if (!sale) return res.status(400).json({ message: 'sale is required' });

  if (!sale.productId) return res.status(400).json({ message: '"productId" is required' });

  if (!sale.quantity && sale.quantity !== 0) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  return next();
};