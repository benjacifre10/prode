"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fixture_controller_1 = __importDefault(require("./../controllers/fixture.controller"));
const check_auth_1 = __importDefault(require("./../middlewares/check-auth"));
class FixtureRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router
            .get('/fixtures', check_auth_1.default, fixture_controller_1.default.fixture_getAll)
            .post('/fixture', check_auth_1.default, fixture_controller_1.default.fixture_insert)
            .delete('/fixture/:id', check_auth_1.default, fixture_controller_1.default.fixture_delete);
    }
}
exports.default = new FixtureRoutes().router;
