const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

// Controllers
const register = require('./controllers/register');
const signIn = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// Connect to Database
const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'justin',
		password: '',
		database: 'facerecognition',
	},
});

app.use(express.json());
app.use(cors());

// Home Route
app.get('/', (req, res) => {
	res.send(database.users);
});

// SignIn Route
app.post('/signin', (req, res) => {
	signIn.handleSignIn(req, res, db, bcrypt);
});

// Register Route
app.post('/register', (req, res) => {
	register.handleRegister(req, res, db, bcrypt);
});

// Profile Route
app.get('/profile/:id', (req, res) => {
	profile.handleProfile(req, res, db);
});

// Image Route
app.put('/image', (req, res) => {
	image.handleImage(req, res, db);
});

// API Call
app.post('/imageurl', (req, res) => {
	image.handleAPICall(req, res);
});

app.listen(3000, () => {
	console.log('app is running on port 3000');
});
