"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthorized = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const user_1 = __importDefault(require("../models/user"));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findByPk(id);
    done(false, user);
}));
const StrategyJWT = passport_jwt_1.default.Strategy;
const ExtractJWT = passport_jwt_1.default.ExtractJwt;
const options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY,
};
passport_1.default.use("jwt", new StrategyJWT(options, (jwt_payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof jwt_payload === "object") {
        const payload = jwt_payload;
        try {
            const { id, email } = payload;
            const user = yield user_1.default.findByPk(id, {
                attributes: { exclude: ["password"] },
            });
            if (!user)
                return done(undefined, false, { message: "Usuario no encontrado." });
            if (user.email !== email)
                return done(undefined, false, { message: "Usuario Inválido." });
            return done(undefined, user);
        }
        catch (err) {
            return done(err, false, { message: err });
        }
    }
    else {
        return done(undefined, false, { message: "Tipo de Payload no válido." });
    }
})));
const isAuthorized = passport_1.default.authenticate("jwt", { session: true });
exports.isAuthorized = isAuthorized;
//# sourceMappingURL=auth.js.map