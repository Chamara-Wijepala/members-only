const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db = require('../db/queries');

/*
This function is automatically called by passport. The reason that we define it
is to use whatever database and password encryption tool that we want. The other
two functions are also called by passport.

The done function is a callback that will take the result of the authentication.
*/
passport.use(
	new LocalStrategy(async (username, password, done) => {
		try {
			const user = await db.getUserByUsername(username);

			if (!user) {
				return done(null, false, { message: 'Incorrect username.' });
			}

			const match = await bcrypt.compare(password, user.password);
			if (!match) {
				return done(null, false, { message: 'Incorrect password.' });
			}

			return done(null, user);
		} catch (error) {
			return done(error);
		}
	})
);

/*
This function is passed the user object that was retrieved in the verify
callback above. It passes the user's id to be stored in the session in the
req.session.passport.user object.
*/
passport.serializeUser((user, done) => {
	done(null, user.id);
});

/*
This function is passed the user's id that was stored in the session in the
serializeUser function. It gets the user from the database using the id and
attaches the user to the request object as req.user
*/
passport.deserializeUser(async (id, done) => {
	try {
		const user = await db.getUserById(id);

		done(null, user);
	} catch (error) {
		done(error);
	}
});
