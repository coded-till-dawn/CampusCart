const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema(
  {
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Wishlist', wishlistSchema);
