const handleProfile = (req, res, db) => {
    const { id } = req.params;
    db.select('*')
        .from('users')
        .where({ id })
        .then((user) => {
            if (user.length) {
                res.json(user[0]);
            } else {
                res.status(400).json('Not found');
            }
        })
        .catch((err) => res.status(400).json('error getting user'));
};

const handleProfileUpdate = (req, res, db) => {
    const { id } = req.params;
    const { name, age, pet } = req.body.formInput;
    db('users')
        .where({ id })
        .update({ name })
        .then((response) => {
            if (response) {
                res.status(200).json('success');
            } else {
                res.status(400).json('error updating');
            }
        })
        .catch((err) => res.status(400).json('error updating user'));
};

module.exports = {
    handleProfile,
    handleProfileUpdate,
};