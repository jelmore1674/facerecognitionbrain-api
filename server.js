const express = require('express');
const app = express();

const db = {
	users: [
		{
			id: '123',
			name: 'John',
			email: 'john@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date(),
		},
		{
			id: '124',
			name: 'Sally',
			email: 'sally@gmail.com',
			password: 'bang',
			entries: 0,
			joined: new Date(),
		},
	],
};

app.use(express.json());

app.get('/', (req, res) => {
	res.send(db.users);
});

app.post('/signin', (req, res) => {
	if (
		req.body.email === db.users[0].email &&
		req.body.password === db.users[0].password
	) {
		res.json('success');
	} else {
		res.status(400).json('error logging in');
	}
});

app.post('/register', (req, res) => {
	const { name, email, password } = req.body;
	db.users.push({
		id: '125',
		name: name,
		email: email,
		password: password,
		entries: 0,
		joined: new Date(),
	});
	res.send(db);
});

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	let found = false;
	db.users.forEach((user) => {
		if (user.id === id) {
			found = true;
			return res.json(user);
		}
	});
	if (!found) {
		res.send('not found');
	}
});

app.post('/images', (req, res) => {
	const { id } = req.body;
	let found = false;
	db.users.forEach((user) => {
		if (user.id === id) {
			found = true;
			user.entries++;
			return res.json(user.entries);
		}
	});
	if (!found) {
		res.send('not found');
	}
});

app.listen(3000, () => {
	console.log('listening on port 3000');
});
