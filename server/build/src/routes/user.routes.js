"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("./../controllers/user.controller"));
const check_auth_1 = __importDefault(require("./../middlewares/check-auth"));
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router
            .get('/users', check_auth_1.default, user_controller_1.default.user_getAll)
            .get('/users/:id', check_auth_1.default, user_controller_1.default.user_get)
            .get('/userstype/:id', check_auth_1.default, user_controller_1.default.user_getByType)
            .post('/signup', user_controller_1.default.user_signup)
            .post('/login', user_controller_1.default.user_login)
            .put('/users/:id', check_auth_1.default, user_controller_1.default.user_update)
            .delete('/users/:id', check_auth_1.default, user_controller_1.default.user_delete);
    }
}
exports.default = new UserRoutes().router;
