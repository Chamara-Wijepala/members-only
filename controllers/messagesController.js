const db = require('../db/queries');

const getMessages = async (req, res) => {
	let messages;

	if (req.user.is_member) {
		messages = await db.getMessagesFull();
	} else {
		messages = await db.getMessagesPartial();
	}

	res.render('messages', { messages });
};

module.exports = {
	getMessages,
};
