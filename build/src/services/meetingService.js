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
const meeting_1 = __importDefault(require("../models/meeting"));
const get_meeting = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield meeting_1.default.findAll();
    if (!result)
        return res.status(500).json();
    return res.status(200).json(result);
});
const post_meeting = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const meetingBuilded = meeting_1.default.build(data);
    const resultValidate = yield meetingBuilded
        .validate()
        .catch((err) => err);
    if (resultValidate.errors)
        res.status(409).json(resultValidate.errors);
    const meetingCreated = yield meetingBuilded
        .save()
        .catch((err) => ({ err }));
    if (meetingCreated.err)
        res.status(409).json(meetingCreated.err.errors);
    res.status(200).json(meetingCreated);
});
const get_meeting_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const meeting = yield meeting_1.default.findByPk(id);
        if (!meeting)
            return res.status(404).json("meeting not found");
        return res.status(200).json(meeting);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
const put_meeting_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const dataPut = req.body;
    const objectDB = yield meeting_1.default.findByPk(id);
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
    get_meeting_by_id,
    put_meeting_by_id,
    get_meeting,
    post_meeting,
};
//# sourceMappingURL=meetingService.js.map