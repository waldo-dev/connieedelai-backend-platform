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
const payments_1 = __importDefault(require("../models/payments"));
const get_payment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payments_1.default.findAll();
    if (!result)
        return res.status(500).json();
    return res.status(200).json(result);
});
const post_payment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const paymentBuilded = payments_1.default.build(data);
    const resultValidate = yield paymentBuilded
        .validate()
        .catch((err) => err);
    if (resultValidate.errors)
        res.status(409).json(resultValidate.errors);
    const paymentCreated = yield paymentBuilded
        .save()
        .catch((err) => ({ err }));
    if (paymentCreated.err)
        res.status(409).json(paymentCreated.err.errors);
    res.status(200).json(paymentCreated);
});
const get_payment_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const payment = yield payments_1.default.findByPk(id);
        if (!payment)
            return res.status(404).json("payment not found");
        return res.status(200).json(payment);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
const put_payment_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const dataPut = req.body;
    const objectDB = yield payments_1.default.findByPk(id);
    if (!objectDB)
        return res.status(404).json("object not found");
    else {
        const objectUpdated = yield objectDB
            .update(dataPut)
            .catch((err) => ({ err }));
        if (objectUpdated.err) {
            const { errors } = objectUpdated.err;
            return res.status(404).json(errors);
        }
        else
            return res.status(200).json(objectUpdated);
    }
});
exports.default = {
    get_payment_by_id,
    put_payment_by_id,
    get_payment,
    post_payment,
};
//# sourceMappingURL=paymentService.js.map