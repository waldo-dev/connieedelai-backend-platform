import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import { FindOptions, ValidationError } from "sequelize";
import { db as DB } from "../config/index";
import User from "../models/user";
import CryptoJS from "crypto-js";
import { generateHash, compareHash, isHash } from "../utils/bcrypt";
require("dotenv").config();

const get_user_all = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const filter: FindOptions = {
		attributes: { exclude: ["password"] },
		where: {
			active: true,
		},
	};
	const result = await User.findAll(filter);
	if (!result) res.status(500).json();
	else res.status(200).json(result);
};

const generatePassword = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let respuesta: any = [];

	const cantidad = req.body;

	for (let index = 0; index < cantidad; index++) {
		const pass = Math.random().toString(36).slice(-8);
		const newHash = generateHash(pass);
		const secretKey = process.env.SECRET_CRYPTO as string;
		const ciphertext = CryptoJS.AES.encrypt(pass, secretKey).toString();
		let item: { password: string; hash: string; aes: string };
		item = { password: pass, hash: newHash, aes: ciphertext };
		respuesta.push(item);
	}

	return respuesta;
};


const post_user = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const data = req.body;

		// Verificar que venga la contraseña
		if (!data.password || data.password.trim().length === 0) {
			return res.status(400).json({ message: "Password requerida" });
		}

		// Hashear la contraseña
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(data.password, saltRounds);
		data.password = hashedPassword;
		data.active = true;

		const userBuilded = User.build(data);
		const resultValidate = await userBuilded
			.validate()
			.catch((err: ValidationError) => err);

		if ((resultValidate as ValidationError).errors)
			return res
				.status(400)
				.json((resultValidate as ValidationError).errors[0]);

		const userCreated: any = await userBuilded.save().catch((err) => ({ err }));
		if (userCreated.err) {
			console.log("🚀 ~ userCreated.err:", userCreated.err);
			return res.status(409).json(userCreated.err.errors);
		}

		return res.status(201).json(userCreated);
	} catch (error) {
		res.status(400).json(error);
	}
};


const get_user_by_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const filter: FindOptions = {
			attributes: { exclude: ["password"] },
		};
		const { id } = req.params;
		const userFinded = await User.findByPk(id, filter);
		if (!userFinded) res.status(500).json();
		return res.status(200).json(userFinded);
	} catch (error) {
		res.status(400).json(error);
	}
};

const get_user_by_rol = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id_rol } = req.params;
	const filter: FindOptions = {
		attributes: { exclude: ["password"] },
		where: {
			active: true,
			rol_id: id_rol,
		},
	};

	const result = await User.findAll(filter);
	if (!result) res.status(500).json();
	else res.status(200).json(result);
};

const put_user = async (req: Request, res: Response, next: NextFunction) => {
	// Revisar
	try {
		const idUser = req.params.id;
		const dataPut = req.body;
		console.log("🚀 ~ constput_user= ~ dataPut:", dataPut);
		const user = await User.findByPk(idUser);

		if (!user) return res.status(404).json("User not found");

		const userUpdated: any = await user
			.update(dataPut)
			.catch((err: any) => ({ err }));

		if ((userUpdated as any).err) {
			const { errors } = (userUpdated as any).err;
			return res.status(404).json(errors);
		}
		return res.status(200).json(userUpdated);
	} catch (error) {
		res.status(400).json(error);
	}
};

const delete_user = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = req.params.id;
		const userFounded = await User.findByPk(id);

		if (!userFounded) return res.status(404).json("User not found");
		const userDeleted: any = await userFounded
			.update({ active: false })
			.catch((err: any) => ({ err }));

		if ((userDeleted as any).err) {
			const { errors } = (userDeleted as any).err;
			return res.status(404).json(errors);
		}

		return res.status(200).json(userDeleted);
	} catch (error) {
		res.status(400).json(error);
	}
};


const post_user_by_email = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let {email} = req.body;
    email = email.trim().toUpperCase();
    const object = await User.findAll({
      where: {
        email: email.trim().toUpperCase(),
        active: true
      }
    });
    if (!object) return res.status(500).json();

    return res.status(200).json(object);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export default {
  get_user_all,
  post_user,
  get_user_by_id,
  put_user,
  delete_user,
  generatePassword,
  post_user_by_email,
	get_user_by_rol,
};
