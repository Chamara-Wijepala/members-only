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

const createMessage = async (req, res) => {
	const { title, body } = req.body;
	const timestamp = new Date();
	const { id } = req.user;

	try {
		await db.insertMessage(title, body, timestamp, id);
	} catch (error) {
		console.error(error);
	} finally {
		res.redirect('/messages');
	}
};

module.exports = {
	getMessages,
	createMessage,
};
