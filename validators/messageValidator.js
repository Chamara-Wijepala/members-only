const { body } = require('express-validator');

const validateMessage = [
	body('title').trim().notEmpty().withMessage('Title is required.').escape(),

	body('body')
		.trim()
		.notEmpty()
		.withMessage('Message body is required.')
		.escape(),
];

module.exports = validateMessage;
