const pool = require('./pool');

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

module.exports = {
	insertUser,
};
