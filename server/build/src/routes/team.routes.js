"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_controller_1 = __importDefault(require("./../controllers/team.controller"));
const check_auth_1 = __importDefault(require("./../middlewares/check-auth"));
class TeamRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router
            .get('/teams', check_auth_1.default, team_controller_1.default.team_getAll)
            .get('/team/:id', check_auth_1.default, team_controller_1.default.team_get)
            .post('/team', check_auth_1.default, team_controller_1.default.team_insert)
            .put('/team/:id', check_auth_1.default, team_controller_1.default.team_update)
            .delete('/team/:id', check_auth_1.default, team_controller_1.default.team_delete);
    }
}
exports.default = new TeamRoutes().router;
