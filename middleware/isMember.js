const isMember = (req, res, next) => {
	if (!req.user.is_member) {
		return res.redirect('/');
	}

	next();
};

module.exports = isMember;
