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
const plan_module_1 = __importDefault(require("../models/plan_module"));
const get_planModule = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield plan_module_1.default.findAll();
    if (!result)
        return res.status(500).json();
    return res.status(200).json(result);
});
const post_planModule = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const planModuleBuilded = plan_module_1.default.build(data);
    const resultValidate = yield planModuleBuilded
        .validate()
        .catch((err) => err);
    if (resultValidate.errors)
        res.status(409).json(resultValidate.errors);
    const planModuleCreated = yield planModuleBuilded
        .save()
        .catch((err) => ({ err }));
    if (planModuleCreated.err)
        res.status(409).json(planModuleCreated.err.errors);
    res.status(200).json(planModuleCreated);
});
const get_planModule_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const planModule = yield plan_module_1.default.findByPk(id);
        if (!planModule)
            return res.status(404).json("planModule not found");
        return res.status(200).json(planModule);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
const put_planModule_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const dataPut = req.body;
    const objectDB = yield plan_module_1.default.findByPk(id);
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
    get_planModule_by_id,
    put_planModule_by_id,
    get_planModule,
    post_planModule,
};
//# sourceMappingURL=planModuleService.js.map