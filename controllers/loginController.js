const getLoginPage = (req, res) => {
	res.render('log-in');
};

const loginUser = (req, res) => {
	console.log(req.body);
};

module.exports = {
	getLoginPage,
	loginUser,
};
