require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const pool = require('./db/pool');
const db = require('./db/queries');
const signupRoutes = require('./routes/signupRoutes');
const loginRoutes = require('./routes/loginRoutes');
const messageRoutes = require('./routes/messageRoutes');
const isAuth = require('./middleware/isAuth');

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

app.use('/sign-up', signupRoutes);
app.use('/login', loginRoutes);
app.use('/logout', (req, res, next) => {
	req.logout((err) => {
		if (err) return next();
		res.redirect('/');
	});
});

// Apply isAuth middleware to all routes after this point.
app.use(isAuth);

app.get('/', (req, res) => {
	res.render('index');
});
app.use('/messages', messageRoutes);
app.post('/membership', async (req, res) => {
	const { memberPassword } = req.body;

	if (memberPassword === 'foo') {
		try {
			await db.grantMembership(req.user.id);
		} catch (error) {
			console.error(error);
		} finally {
			res.redirect('/');
		}
	}
});

app.listen(3000, () => console.log('Server running.'));
