"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const matchweek_controller_1 = __importDefault(require("./../controllers/matchweek.controller"));
const check_auth_1 = __importDefault(require("./../middlewares/check-auth"));
class MatchWeekRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router
            .get('/matchweek/:id', check_auth_1.default, matchweek_controller_1.default.matchweek_get)
            .post('/matchweek/date', check_auth_1.default, matchweek_controller_1.default.matchweek_getByDate)
            .post('/matchweek', check_auth_1.default, matchweek_controller_1.default.matchweek_insert)
            .put('/matchweek/:id', check_auth_1.default, matchweek_controller_1.default.matchweek_update)
            .delete('/matchweek/:id', check_auth_1.default, matchweek_controller_1.default.matchweek_delete);
    }
}
exports.default = new MatchWeekRoutes().router;
