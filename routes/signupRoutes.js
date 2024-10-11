const express = require('express');
const signupController = require('../controllers/signupController');
const validateSignup = require('../validators/signupValidator');
const checkValidationErrors = require('../middleware/checkValidationErrors');

const router = express.Router();

router.get('/', signupController.getSignupPage);
// Validates and checks for any errors. Doing it this way ensures that when
// control is passed to the controller, all the data it receives is valid.
router.post(
	'/',
	validateSignup,
	checkValidationErrors,
	signupController.createUser
);

module.exports = router;
