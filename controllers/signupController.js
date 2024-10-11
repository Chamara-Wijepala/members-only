const bcrypt = require('bcryptjs');
const db = require('../db/queries');

const getSignupPage = (req, res) => {
	res.render('sign-up');
};

const createUser = (req, res) => {
	const { firstName, lastName, username, password } = req.body;

	// Usually, the salt is stored in the database alongside the hash, but in this
	// case, bcrypt incorporates the salt into the hash itself.
	bcrypt.hash(password, 10, async (err, hashedPassword) => {
		if (err) console.error(err);

		const newUser = await db.insertUser(
			firstName,
			lastName,
			username,
			hashedPassword
		);

		console.log(newUser);
	});

	res.redirect('/sign-up');
};

module.exports = {
	getSignupPage,
	createUser,
};
