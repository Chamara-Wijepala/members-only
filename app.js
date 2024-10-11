require('dotenv').config();
const express = require('express');
const signupRoutes = require('./routes/signupRoutes');
const loginRoutes = require('./routes/loginRoutes');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('index');
});
app.use('/sign-up', signupRoutes);
app.use('/login', loginRoutes);

app.listen(3000, () => console.log('Server running.'));
