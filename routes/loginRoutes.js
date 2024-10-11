const express = require('express');
const loginController = require('../controllers/loginController');
const validateLogin = require('../validators/loginValidator');
const checkValidationErrors = require('../middleware/checkValidationErrors');

const router = express.Router();

router.get('/', loginController.getLoginPage);
// Validates and checks for any errors. Doing it this way ensures that when
// control is passed to the controller, all the data it receives is valid.
router.post(
	'/',
	validateLogin,
	checkValidationErrors,
	loginController.loginUser
);

module.exports = router;
