const express = require('express');
const passport = require('passport');
const loginController = require('../controllers/loginController');

const router = express.Router();

router.get('/', loginController.getLoginPage);
/*
passport.authenticate looks at the request body for parameters named 'username'
and 'password' and passes them to the verify callback defined in
config/passport.js.
*/
router.post(
	'/',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/',
	})
);

module.exports = router;
