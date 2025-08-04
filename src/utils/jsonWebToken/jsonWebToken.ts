import { sign, verify, SignOptions } from "jsonwebtoken";
import { IUser } from "../../models/user";

const secretKey = process.env.JWT_SECRET_KEY as string;
const recoveryPasswordKey = process.env.RECOVERY_PASSWORD_KEY as string;

const options: SignOptions = { algorithm: "HS256", expiresIn: "8h" };

const generate_token = (user: IUser) => {
	return sign(user, secretKey, options);
};

const generate_token_recovery_password = (user: IUser) => {
	return sign(user, recoveryPasswordKey, options);
};

const verify_token = (token: string) => {
	try {
		const verifed = verify(token, recoveryPasswordKey, options);
		return verifed;
	} catch (err) {
		console.log(err);
		return null;
	}
};

export default {
	generate_token,
	verify_token,
	generate_token_recovery_password,
};
