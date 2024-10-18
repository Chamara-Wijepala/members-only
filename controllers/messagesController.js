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

const deleteMessage = async (req, res) => {
	const { id } = req.params;

	try {
		await db.deleteMessageById(id);

		res.sendStatus(200);
	} catch (error) {
		console.error(error);
	}
};

module.exports = {
	getMessages,
	createMessage,
	deleteMessage,
};
