const Item = require('../models/Item');

// Get all items with filtering and sorting
exports.getAllItems = async (req, res) => {
  try {
    const { category, sort, search } = req.query;
    
    let filter = {};
    if (category) filter.category = category;
    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    let query = Item.find(filter);

    if (sort === 'low-high') {
      query = query.sort({ price: 1 });
    } else if (sort === 'high-low') {
      query = query.sort({ price: -1 });
    } else {
      query = query.sort({ createdAt: -1 });
    }

    const items = await query;
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error: error.message });
  }
};

// Get single item by ID
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item', error: error.message });
  }
};

// Create new item
exports.createItem = async (req, res) => {
  try {
    const { title, price, category, description, image, sellerName, contact, location } = req.body;

    if (!title || !price || !category || !description || !image || !sellerName || !contact || !location) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newItem = new Item({
      title,
      price: parseFloat(price),
      category,
      description,
      image,
      sellerName,
      contact,
      location,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Error creating item', error: error.message });
  }
};

// Update item
exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error updating item', error: error.message });
  }
};

// Delete item
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error: error.message });
  }
};

// Get similar items (same category)
exports.getSimilarItems = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const similarItems = await Item.find({
      category: item.category,
      _id: { $ne: req.params.id },
    }).limit(4);

    res.status(200).json(similarItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching similar items', error: error.message });
  }
};
