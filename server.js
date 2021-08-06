const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');

// Controllers
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const auth = require('./controllers/authorization');

// Connect to Database
const db = knex({
    client: 'pg',
    connection: process.env.POSTGRES_URI,
});

app.use(express.json());
app.use(cors());
app.use(morgan('combined'));
// Home Route
app.get('/', (req, res) => {
    res.send('it is working');
});

// SignIn Route
app.post('/signin', signin.signinAuthentication(db, bcrypt));

// Register Route
app.post('/register', (req, res) => {
    register.handleRegister(req, res, db, bcrypt);
});

// Profile Route
app.get('/profile/:id', auth.requireAuth, (req, res) => {
    profile.handleProfile(req, res, db);
});
app.post('/profile/:id', auth.requireAuth, (req, res) => {
    profile.handleProfileUpdate(req, res, db);
});

// Image Route
app.put('/image', auth.requireAuth, (req, res) => {
    image.handleImage(req, res, db);
});

// API Call
app.post('/imageurl', auth.requireAuth, (req, res) => {
    image.handleAPICall(req, res);
});

app.listen(process.env.PORT || 3000, () => {
    console.log('app is running on port 3000');
});