"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usermatchweek_controller_1 = __importDefault(require("./../controllers/usermatchweek.controller"));
const check_auth_1 = __importDefault(require("./../middlewares/check-auth"));
class UserMatchWeekRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router
            .get('/usermatchweek/:id', check_auth_1.default, usermatchweek_controller_1.default.usermatchweek_get);
    }
}
exports.default = new UserMatchWeekRoutes().router;
