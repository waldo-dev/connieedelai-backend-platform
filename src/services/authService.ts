import { Request, Response, NextFunction } from "express";
import { FindOptions } from "sequelize";
import { sign, verify, SignOptions } from "jsonwebtoken";
import User, { IUser } from "../models/user";
import { compareHash } from "../utils/bcrypt";

const secretKey = process.env.JWT_SECRET_KEY as string;
// const recoveryPasswordKey = process.env.RECOVERY_PASSWORD_KEY as string;

const options: SignOptions = { algorithm: "HS256", expiresIn: "8h" };
type objectToPayload = { [keys: string]: any };

const makePayload = (object: objectToPayload, fields: Array<string>) => {
	const payload = fields.reduce((prev, value, index) => {
		const objValue = object[value];
		const newObj = { ...prev, [value]: objValue };
		return newObj;
	}, {} as any);

	return payload;
};

const auth_login = async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body;
	const filter: FindOptions = {
		attributes: { exclude: ["password"] },
	};
	try {
		const userFind = await User.findOne({
			where: {
				email: email,
			},
		});
		if (userFind) {
			const validatePass = compareHash(password, userFind.password);
			console.log("🚀 ~ constauth_login= ~ validatePass:", validatePass)
			const fields = ["id", "name", "email", "lastname", "active", "role", "plan"];

			if (validatePass) {
				const payload = makePayload(userFind, fields);

				const token = sign(payload, secretKey);
				console.log("🚀 ~ constauth_login= ~ payload:", payload + " token: " + token)
				res.status(200).json({ user: payload, token: token });
			} else {
				res.status(400).json({ message: "Usuario/Contraseña Inválido" });
			}
		}
	} catch (err) {
		//console.log("🚀 ~ file: authService.ts:29 ~ constauth_login= ~ err:", err);
		res.status(400).json({ err });
	}
};

const auth_autorization = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return res.status(200).json(req.user);
};

export default { auth_login, auth_autorization };
