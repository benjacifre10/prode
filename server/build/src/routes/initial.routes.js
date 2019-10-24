"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const initial_controller_1 = require("./../controllers/initial.controller");
class InitialRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router
            .get('/', initial_controller_1.initialController.initial);
    }
}
exports.default = new InitialRoutes().router;
