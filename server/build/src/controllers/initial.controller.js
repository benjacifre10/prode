"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InitialController {
    constructor() {
        this.initial = (req, res) => {
            return res.json({ message: 'principal' });
        };
    }
}
exports.initialController = new InitialController();
