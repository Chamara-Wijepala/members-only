const db = require('../db/queries');

const getMessages = async (req, res) => {
	const isMember = req.user.is_member;
	let messages;

	if (!isMember) {
		messages = await db.getMessagesPartial();
	}

	res.render('messages', { messages });
};

module.exports = {
	getMessages,
};
