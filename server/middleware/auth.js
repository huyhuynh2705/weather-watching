import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.SECRET_KEY;

const auth = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		let decodedData;

		if (token) {
			decodedData = jwt.verify(token, secret);
			req.userId = decodedData?.id;
		}

		next();
	} catch (error) {
		res.status(404).json('Un authorized');
		console.log(error);
	}
};

export default auth;
