const { validationResult } = require('express-validator');

// express-validator does not automatically report errors, so this custom
// middleware gets and sends any reported errors to the client.
const checkValidationErrors = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).send({ errors: errors.array() });
	}

	next();
};

module.exports = checkValidationErrors;
