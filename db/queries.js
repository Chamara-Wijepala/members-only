const pool = require('./pool');

// Users

async function insertUser(firstName, lastName, username, password) {
	const { rows } = await pool.query(
		`
    INSERT INTO users (firstname, lastname, username, password)
    VALUES ($1, $2, $3, $4)
    RETURNING id, username
    `,
		[firstName, lastName, username, password]
	);
	return rows[0];
}

async function getUserByUsername(username) {
	const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [
		username,
	]);
	return rows[0];
}

async function getUserById(id) {
	const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
	return rows[0];
}

async function grantMembership(id) {
	const { rowCount } = await pool.query(
		`
		UPDATE users SET is_member = true WHERE id = $1
		`,
		[id]
	);

	if (rowCount === 0) {
		throw new Error('There was an error updating membership status');
	}
}

async function grantAdminPrivilege(id) {
	const { rowCount } = await pool.query(
		`
		UPDATE users SET is_admin = true WHERE id = $1
		`,
		[id]
	);

	if (rowCount === 0) {
		throw new Error('There was an error updating admin status');
	}
}

// Messages

async function getMessagesPartial() {
	const { rows } = await pool.query('SELECT title, body FROM messages');
	return rows;
}

async function getMessagesFull() {
	const { rows } = await pool.query(
		`
		SELECT messages.id, title, body, timestamp, username
		FROM messages
		JOIN users ON messages.user_id = users.id
		`
	);
	return rows;
}

async function insertMessage(title, body, timestamp, userId) {
	const { rowCount } = await pool.query(
		`
		INSERT INTO messages (title, body, timestamp, user_id)
		VALUES ($1, $2, $3, $4)
		`,
		[title, body, timestamp, userId]
	);

	if (rowCount === 0) {
		throw new Error('There was an error while posting the message');
	}
}

async function deleteMessageById(id) {
	const { rowCount } = await pool.query(`DELETE FROM messages WHERE id = $1`, [
		id,
	]);

	if (rowCount === 0) {
		throw new Error('There was an error while deleting the message');
	}
}

module.exports = {
	insertUser,
	getUserByUsername,
	getUserById,
	getMessagesPartial,
	grantMembership,
	grantAdminPrivilege,
	getMessagesFull,
	insertMessage,
	deleteMessageById,
};
