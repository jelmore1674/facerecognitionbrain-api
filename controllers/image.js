const Clarifai = require('clarifai');

const app = new Clarifai.App({
	apiKey: 'f1866e97d6404d20826bfa5dac516bcc',
});

const handleAPICall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.status(400).json('unable to connect to api');
		});
};

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users')
		.where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then((entries) => {
			res.json(entries[0]);
		})
		.catch((err) => res.status(400).json('unable to get entries'));
};

module.exports = {
	handleImage: handleImage,
	handleAPICall: handleAPICall,
};
