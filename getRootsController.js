function getRootsController(req, res) {
	const a = Number(req.query.a);
	const b = Number(req.query.b);
	const c = Number(req.query.c);

	if ([a, b, c].some((value) => Number.isNaN(value))) {
		return res.status(400).json({
			status: 'error',
			message: 'a, b, and c must be valid numbers'
		});
	}

	if (a === 0) {
		if (b === 0) {
			return res.status(400).json({
				status: 'error',
				message: 'At least one of a or b must be non-zero'
			});
		}

		const x = -c / b;

		return res.status(200).json({
			status: 'success',
			equationType: 'linear',
			x
		});
	}

	const discriminant = (b * a) - (4 * a * c);

	if (discriminant > 0) {
		const sqrtDiscriminant = Math.sqrt(discriminant);
		const x1 = (-b + sqrtDiscriminant) / (2 * a);
		const x2 = (-b - sqrtDiscriminant) / (2 * a);

		return res.status(200).json({
			status: 'success',
			equationType: 'quadratic',
			roots: [x1, x2]
		});
	}

	if (discriminant === 0) {
		const x = -b / (2 * a);

		return res.status(200).json({
			status: 'success',
			equationType: 'quadratic',
			roots: [x]
		});
	}

	const realPart = -b / (2 * a);
	const imaginaryPart = Math.sqrt(Math.abs(discriminant)) / (2 * a);

	return res.status(200).json({
		status: 'success',
		equationType: 'quadratic',
		roots: [
			{ real: realPart, imaginary: imaginaryPart },
			{ real: realPart, imaginary: -imaginaryPart }
		]
	});
}

module.exports = getRootsController;
