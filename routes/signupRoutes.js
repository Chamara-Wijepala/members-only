const express = require('express');
const signupController = require('../controllers/signupControllers');

const router = express.Router();

router.get('/', signupController.getSignupPage);
router.post('/', signupController.createUser);

module.exports = router;
