require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const pool = require('./db/pool');
const signupRoutes = require('./routes/signupRoutes');
const loginRoutes = require('./routes/loginRoutes');

const pgSession = require('connect-pg-simple')(session);

require('./config/passport');

const app = express();

// The session middleware is not used directly, it is a dependency used by
// passport.js in the background.
app.use(
	session({
		store: new pgSession({ pool }),
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24, // 1 day
		},
	})
);
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
// Custom middleware to add the user to the locals object.
app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('index');
});
app.use('/sign-up', signupRoutes);
app.use('/login', loginRoutes);
app.use('/logout', (req, res, next) => {
	req.logout((err) => {
		if (err) return next();
		res.redirect('/');
	});
});

app.listen(3000, () => console.log('Server running.'));
