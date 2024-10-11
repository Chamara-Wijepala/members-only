const getSignupPage = (req, res) => {
	res.render('sign-up');
};

const createUser = (req, res) => {
	console.log(req.body);
	res.redirect('/sign-up');
};

module.exports = {
	getSignupPage,
	createUser,
};
