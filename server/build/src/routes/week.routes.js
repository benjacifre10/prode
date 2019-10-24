"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const week_controller_1 = __importDefault(require("./../controllers/week.controller"));
const check_auth_1 = __importDefault(require("./../middlewares/check-auth"));
class WeekRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router
            .get('/week/:id', check_auth_1.default, week_controller_1.default.week_get)
            .post('/week', check_auth_1.default, week_controller_1.default.week_insert)
            .delete('/week/:id', check_auth_1.default, week_controller_1.default.week_delete);
    }
}
exports.default = new WeekRoutes().router;
