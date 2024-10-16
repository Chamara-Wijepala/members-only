const pool = require('./pool');

// Users

async function insertUser(firstName, lastName, username, password) {
	const { rows } = await pool.query(
		`
    INSERT INTO users (firstname, lastname, username, password)
    VALUES ($1, $2, $3, $4)
    RETURNING username, password
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

module.exports = {
	insertUser,
	getUserByUsername,
	getUserById,
};
