const express = require('express');
const messagesController = require('../controllers/messagesController');
const isMember = require('../middleware/isMember');
const isAdmin = require('../middleware/isAdmin');
const validateMessage = require('../validators/messageValidator');
const checkValidationErrors = require('../middleware/checkValidationErrors');

const router = express.Router();

router.get('/', messagesController.getMessages);
router.post(
	'/',
	isMember,
	validateMessage,
	checkValidationErrors,
	messagesController.createMessage
);
router.delete('/:id', isAdmin, messagesController.deleteMessage);

module.exports = router;
