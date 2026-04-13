const Wishlist = require('../models/Wishlist');
const Item = require('../models/Item');

// Get wishlist items
exports.getWishlist = async (req, res) => {
  try {
    const wishlistItems = await Wishlist.find().populate('itemId');
    res.status(200).json(wishlistItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist', error: error.message });
  }
};

// Add to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const { itemId } = req.body;

    if (!itemId) {
      return res.status(400).json({ message: 'Item ID is required' });
    }

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const existingWishlist = await Wishlist.findOne({ itemId });
    if (existingWishlist) {
      return res.status(400).json({ message: 'Item already in wishlist' });
    }

    const wishlistItem = new Wishlist({ itemId });
    await wishlistItem.save();

    res.status(201).json(wishlistItem);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to wishlist', error: error.message });
  }
};

// Remove from wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const wishlistItem = await Wishlist.findByIdAndDelete(req.params.id);
    if (!wishlistItem) {
      return res.status(404).json({ message: 'Wishlist item not found' });
    }
    res.status(200).json({ message: 'Item removed from wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing from wishlist', error: error.message });
  }
};

// Check if item is in wishlist
exports.isInWishlist = async (req, res) => {
  try {
    const { itemId } = req.params;
    const wishlistItem = await Wishlist.findOne({ itemId });
    res.status(200).json({ inWishlist: !!wishlistItem, wishlistId: wishlistItem?._id });
  } catch (error) {
    res.status(500).json({ message: 'Error checking wishlist', error: error.message });
  }
};
