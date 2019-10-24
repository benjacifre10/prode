"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tournament_controller_1 = __importDefault(require("./../controllers/tournament.controller"));
const check_auth_1 = __importDefault(require("./../middlewares/check-auth"));
class TournamentRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router
            .get('/tournaments', check_auth_1.default, tournament_controller_1.default.tournament_getAll)
            .get('/tournament/:id', check_auth_1.default, tournament_controller_1.default.tournament_get)
            .post('/tournament', check_auth_1.default, tournament_controller_1.default.tournament_insert)
            .put('/tournament/:id', check_auth_1.default, tournament_controller_1.default.tournament_update)
            .delete('/tournament/:id', check_auth_1.default, tournament_controller_1.default.tournament_delete);
    }
}
exports.default = new TournamentRoutes().router;
