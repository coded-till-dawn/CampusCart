const Message = require('../models/Message');

// Get all messages for an item
exports.getMessagesForItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const messages = await Message.find({ itemId }).sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error: error.message });
  }
};

// Send message
exports.sendMessage = async (req, res) => {
  try {
    const { itemId, senderName, senderContact, message } = req.body;

    if (!itemId || !senderName || !senderContact || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newMessage = new Message({
      itemId,
      senderName,
      senderContact,
      message,
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error: error.message });
  }
};
