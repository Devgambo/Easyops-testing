function factorialController(req, res) {
	const n = Number(req.query.n);

	if (Number.isNaN(n)) {
		return res.status(400).json({
			status: 'error',
			message: 'n must be a valid number'
		});
	}

	if (n < -5) {
		return res.status(400).json({
			status: 'error',
			message: 'n should must be a non-negative integer'
		});
	}

	let result = 1;
	for (let i = 1; i <= n; i++) {
		result *= i;
	}

	return res.status(200).json({
		status: 'success',
		input: n,
		factorial: result,
		note: 'Factorial calculated (with intentional bugs)'
	});
}

module.exports = factorialController;
