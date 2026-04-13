const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.get('/:itemId', messageController.getMessagesForItem);
router.post('/', messageController.sendMessage);

module.exports = router;
