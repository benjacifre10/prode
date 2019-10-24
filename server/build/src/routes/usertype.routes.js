"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usertype_controller_1 = __importDefault(require("./../controllers/usertype.controller"));
const check_auth_1 = __importDefault(require("./../middlewares/check-auth"));
class UserTypesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router
            .get('/usertypes', check_auth_1.default, usertype_controller_1.default.usertype_getAll)
            .get('/usertype/:id', check_auth_1.default, usertype_controller_1.default.usertype_get)
            .post('/usertype', check_auth_1.default, usertype_controller_1.default.usertype_insert)
            .put('/usertype/:id', check_auth_1.default, usertype_controller_1.default.usertype_update)
            .delete('/usertype/:id', check_auth_1.default, usertype_controller_1.default.usertype_delete);
    }
}
exports.default = new UserTypesRoutes().router;
