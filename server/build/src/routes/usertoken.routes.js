"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usertoken_controller_1 = __importDefault(require("./../controllers/usertoken.controller"));
const check_auth_1 = __importDefault(require("./../middlewares/check-auth"));
class UserTokensRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router
            .get('/usertokens', check_auth_1.default, usertoken_controller_1.default.usertoken_getAll)
            .get('/usertoken/:id', check_auth_1.default, usertoken_controller_1.default.usertoken_get)
            .post('/usertoken', check_auth_1.default, usertoken_controller_1.default.usertoken_insert)
            .put('/usertoken/:id', check_auth_1.default, usertoken_controller_1.default.usertoken_update)
            .delete('/usertoken/:id', check_auth_1.default, usertoken_controller_1.default.usertoken_delete);
    }
}
exports.default = new UserTokensRoutes().router;
