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

module.exports = {
	insertUser,
	getUserByUsername,
	getUserById,
	getMessagesPartial,
	grantMembership,
	getMessagesFull,
};
