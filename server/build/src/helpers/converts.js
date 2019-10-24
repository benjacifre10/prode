"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToJson = (value) => {
    return JSON.parse(JSON.stringify(value[0]));
};
