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
const AuthController_1 = require("./../controllers/AuthController");
const express_1 = require("express");
let router = (0, express_1.Router)();
/* GET 200 OK */
router.get('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const controller = new AuthController_1.AuthController();
        const response = yield controller.authorize(req.body);
        return res.send(response);
    });
});
exports.default = router;
