"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkAuth = (req, res, next) => {
    //Get the jwt token from the head
    const token = req.headers["authorization"];
    let jwtPayload;
    //Try to validate the token and get data
    try {
        jwtPayload = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
        res.locals.jwtPayload = jwtPayload;
        console.log('resultado', jwtPayload);
    }
    catch (error) {
        //If token is not valid, respond with 401 (unauthorized)
        res.status(401).send();
        return;
    }
    //The token is valid for 1 hour
    //We want to send a new token on every request
    const { userId, username } = jwtPayload;
    const newToken = jsonwebtoken_1.default.sign({ userId, username }, process.env.JWT_KEY, {
        expiresIn: "1h"
    });
    res.setHeader("token", newToken);
    //Call the next middleware or controller
    next();
};
exports.default = checkAuth;
