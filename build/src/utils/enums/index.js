"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtEnum = exports.statusEnum = exports.rolEnum = void 0;
var rolEnum;
(function (rolEnum) {
    rolEnum[rolEnum["Admin"] = 1] = "Admin";
    rolEnum[rolEnum["Supervisor"] = 2] = "Supervisor";
    rolEnum[rolEnum["Auditor"] = 3] = "Auditor";
    rolEnum[rolEnum["Cliente"] = 4] = "Cliente";
})(rolEnum || (exports.rolEnum = rolEnum = {}));
var jwtEnum;
(function (jwtEnum) {
    jwtEnum["reset_token"] = "reset_token";
})(jwtEnum || (exports.jwtEnum = jwtEnum = {}));
var statusEnum;
(function (statusEnum) {
    statusEnum[statusEnum["EN_ESPERA"] = 1] = "EN_ESPERA";
    statusEnum[statusEnum["APROBADO"] = 2] = "APROBADO";
    statusEnum[statusEnum["RECHAZADO"] = 3] = "RECHAZADO";
    statusEnum[statusEnum["PROCESO"] = 4] = "PROCESO";
})(statusEnum || (exports.statusEnum = statusEnum = {}));
//# sourceMappingURL=index.js.map