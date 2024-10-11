const { body } = require('express-validator');

/*
NOTES

The .escape() method is not used on the passwords, as they are not rendered as
html and thus are not prone to html injection attacks.

The custom validator must return a truthy value to indicate that the field is
valid, or a falsy value to indicate that it's invalid.
If a custom validator throws, it also counts as being invalid. withMessage is
not required if throwing an error, as it will be used as it's error message.
*/
const validateSignup = [
	body('firstName')
		.trim()
		.notEmpty()
		.withMessage('First name is required.')
		.escape(),

	body('lastName')
		.trim()
		.notEmpty()
		.withMessage('Last name is required.')
		.escape(),

	// TODO: validate if username is already in use.
	body('username')
		.trim()
		.notEmpty()
		.withMessage('Username is required.')
		.escape(),

	body('password').trim().notEmpty().withMessage('Password is required.'),

	body('confirmPassword')
		.trim()
		.notEmpty()
		.withMessage('Confirm password is required.')
		.custom((value, { req }) => {
			return value === req.body.password;
		})
		.withMessage('Passwords do not match.'),
];

module.exports = validateSignup;
