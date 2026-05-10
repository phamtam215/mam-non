const Product = require('../models/Product');

async function getProducts(req, res, next) {
  try {
    const { search = '', category = 'all' } = req.query;

    const query = {};

    if (category === 'fresh' || category === 'dried') {
      query.category = category;
    }

    if (search.trim()) {
      query.name = { $regex: search.trim(), $options: 'i' };
    }

    const products = await Product.find(query)
      .sort({ isHot: -1, createdAt: -1 })
      .select('name price unit category image isHot');

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProducts
};
