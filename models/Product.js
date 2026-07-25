const mongoose = require('mongoose');
const { CATEGORY_TYPES } = require('../data/categories');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    unit: {
      type: String,
      default: 'kg'
    },
    category: {
      type: String,
      enum: CATEGORY_TYPES,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    isHot: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

productSchema.index({ name: 'text' });

module.exports = mongoose.model('Product', productSchema);
