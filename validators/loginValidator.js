const { body } = require('express-validator');

const validateLogin = [
	body('username')
		.trim()
		.notEmpty()
		.withMessage('Username is required.')
		.escape(),

	body('password').trim().notEmpty().withMessage('Password is required.'),
];

module.exports = validateLogin;
