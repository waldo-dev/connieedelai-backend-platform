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
Object.defineProperty(exports, "__esModule", { value: true });
const get_alert = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const alerts = [
        {
            threshold_alert: "BAJO",
            breach_alert: "NINGUNA",
            suggestions: [
                "Sugerencia 1",
                "Sugerencia 2",
                "Sugerencia 3",
                "Sugerencia 4",
            ],
        },
        {
            threshold_alert: "ALTA",
            breach_alert: "MEJORAR",
            suggestions: [
                "Sugerencia 1",
                "Sugerencia 2",
                "Sugerencia 3",
                "Sugerencia 4",
            ],
        },
        {
            threshold_alert: "MEDIA",
            breach_alert: "COMPRENDER",
            suggestions: [
                "Sugerencia 1",
                "Sugerencia 2",
                "Sugerencia 3",
                "Sugerencia 4",
            ],
        },
    ];
    if (!alerts)
        return res.status(500).json(alerts);
    else
        return res.status(200).json(alerts);
});
exports.default = {
    get_alert,
};
//# sourceMappingURL=alertService.js.map