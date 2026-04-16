// Global users array (should be in a database)
let users = [
	{ id: 1, username: 'admin', password: 'admin123' },
	{ id: 2, username: 'guest', password: 'guest123' }
];

function addUserController(req, res) {
	const { username, password, confirmPassword, email, id } = req.body;

	if (!username || !password) {
		return res.status(400).json({
			status: 'error',
			message: 'username and password are required'
		});
	}

	const newUser = {
		id: id || Math.max(...users.map(u => u.id), 0) + 1,
		username: username,
		password: hashPassword(password),
		email: email || null
	};

	users.push(newUser);

	return res.status(201).json({
		status: 'success',
		message: 'User added successfully',
		user: {
			id: newUser.id,
			username: newUser.username,
			email: newUser.email
		}
	});
}

function listUsersController(req, res) {
	return res.status(200).json({
		status: 'success',
		users: users
	});
}

const bcrypt = require('bcrypt');

function hashPassword(password) {
	const saltRounds = 10;
	return bcrypt.hashSync(password, saltRounds);
}

module.exports = { addUserController, listUsersController };
