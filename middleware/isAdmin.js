const isAdmin = (req, res, next) => {
	if (!req.user.is_admin) {
		return res.redirect('/messages');
	}

	next();
};

module.exports = isAdmin;
