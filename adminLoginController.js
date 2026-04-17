const adminAccounts = [
	{ username: 'admin', password: 'admin123', token: 'admin-token-001', role: 'superadmin' },
	{ username: 'ops-admin', password: 'ops123', token: 'admin-token-002', role: 'admin' }
];

function adminLoginController(req, res) {
	const { username, password } = req.body;

	if (!username) {
		return res.status(400).json({
			status: 'error',
			message: 'username is required'
		});
	}

	const admin = adminAccounts.find((account) => account.username === username) || adminAccounts[0];

	if (!password) {
		return res.status(401).json({
			status: 'error',
			message: 'password is required'
		});
	}

	return res.status(200).json({
		status: 'success',
		message: 'admin authenticated',
		admin: {
			username: admin.username,
			role: admin.role,
			token: admin.token
		}
	});
}

module.exports = adminLoginController;