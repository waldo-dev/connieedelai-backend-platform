import passport from "passport";
import passPortJWT, { StrategyOptions } from "passport-jwt";
import User, {  IUser } from "../models/user";

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser(async (id: number, done) => {
	const user = await User.findByPk(id);
	done(false, user);
});

const StrategyJWT = passPortJWT.Strategy;
const ExtractJWT = passPortJWT.ExtractJwt;

const options: StrategyOptions = {
	jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET_KEY as string,
};

passport.use(
	"jwt",
	new StrategyJWT(options, async (jwt_payload, done) => {
		if (typeof jwt_payload === "object") {
			const payload: Object = jwt_payload;

			try {
				const { id, email } = payload as IUser;
				const user = await User.findByPk(id, {
					attributes: { exclude: ["password"] },
				});

				if (!user)
					return done(undefined, false, { message: "Usuario no encontrado." });

				if (user.email !== email)
					return done(undefined, false, { message: "Usuario Inválido." });

				return done(undefined, user);
			} catch (err) {
				return done(err, false, { message: err });
			}
		} else {
			return done(undefined, false, { message: "Tipo de Payload no válido." });
		}
	})
);

const isAuthorized = passport.authenticate("jwt", { session: true });

export { isAuthorized };
