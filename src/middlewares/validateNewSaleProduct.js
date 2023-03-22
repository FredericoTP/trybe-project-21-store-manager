module.exports = (req, res, next) => {
  const [sale] = req.body;

  if (!sale) return res.status(400).json({ message: 'sale is required' });

  return next();
};