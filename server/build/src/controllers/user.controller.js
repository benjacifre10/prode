"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("./../config/connection");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const converts_1 = require("./../helpers/converts");
class UserController {
    user_signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield connection_1.connect();
            try {
                const result = yield conn.query(`SELECT * FROM user WHERE email = ?`, req.body.email);
                if (converts_1.convertToJson(result).length > 0) {
                    return res.status(409).json({
                        message: 'Ya existe ese usuario'
                    });
                }
                else {
                    let newUser = req.body;
                    newUser.password = bcryptjs_1.default.hashSync(req.body.password, 10);
                    const result = yield conn.query('INSERT INTO user SET ?', [newUser]);
                    return res.status(200).json({
                        message: 'Registración correcta del usuario',
                        value: result[0]
                    });
                }
            }
            catch (error) {
                return res.status(400).json({
                    message: error
                });
            }
        });
    }
    user_login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield connection_1.connect();
            try {
                const result = yield conn.query(`SELECT * FROM user WHERE email = ?`, req.body.email);
                if (converts_1.convertToJson(result).length > 0) {
                    if (bcryptjs_1.default.compareSync(req.body.password, Buffer.from(converts_1.convertToJson(result)[0].password).toString())) {
                        const token = jsonwebtoken_1.default.sign({
                            email: converts_1.convertToJson(result)[0].email,
                            userId: converts_1.convertToJson(result)[0].id_user
                        }, process.env.JWT_KEY, {
                            expiresIn: "1h"
                        });
                        let user = {
                            id_user: converts_1.convertToJson(result)[0].id_user,
                            email: converts_1.convertToJson(result)[0].email,
                            name: converts_1.convertToJson(result)[0].name,
                            surname: converts_1.convertToJson(result)[0].surname,
                            id_user_type: converts_1.convertToJson(result)[0].id_user_type
                        };
                        return res.status(200).json({
                            message: 'Usuario Encontrado',
                            user,
                            token: token
                        });
                    }
                    else {
                        return res.status(200).json({
                            message: 'usuario o contraseña mal'
                        });
                    }
                }
                else {
                    return res.status(409).json({
                        message: 'Datos incorrectos'
                    });
                }
            }
            catch (error) {
                return res.status(400).json({
                    message: error
                });
            }
        });
    }
    user_getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield connection_1.connect();
            try {
                const result = yield conn.query(`SELECT * FROM user`);
                if (converts_1.convertToJson(result).length > 0) {
                    return res.status(200).json({
                        results: result[0]
                    });
                }
                else {
                    return res.status(409).json({
                        message: 'No existen usuarios'
                    });
                }
            }
            catch (error) {
                return res.status(400).json({
                    message: error
                });
            }
        });
    }
    user_get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield connection_1.connect();
            try {
                const result = yield conn.query(`SELECT * FROM user WHERE id_user = ?`, req.params.id);
                if (converts_1.convertToJson(result).length > 0) {
                    return res.status(200).json({
                        results: result[0]
                    });
                }
                else {
                    return res.status(409).json({
                        message: 'No existe ese usuario'
                    });
                }
            }
            catch (error) {
                return res.status(400).json({
                    message: error
                });
            }
        });
    }
    user_getByType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield connection_1.connect();
            try {
                const result = yield conn.query(`SELECT * FROM user WHERE id_user_type = ?`, req.params.id);
                if (converts_1.convertToJson(result).length > 0) {
                    return res.status(200).json({
                        results: result[0]
                    });
                }
                else {
                    return res.status(200).json({
                        results: -1,
                        message: 'No existen esos tipos de usuario'
                    });
                }
            }
            catch (error) {
                return res.status(400).json({
                    message: error
                });
            }
        });
    }
    user_update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            const conn = yield connection_1.connect();
            try {
                const result = yield conn.query('UPDATE user SET ? WHERE id_user = ?', [user, req.params.id]);
                if (result[0].affectedRows > 0) {
                    return res.status(200).json({
                        results: result[0].affectedRows,
                        message: 'Usuario actualizado'
                    });
                }
                else {
                    return res.status(409).json({
                        results: 'No se encontro el usuario'
                    });
                }
            }
            catch (error) {
                return res.status(400).json({
                    message: error
                });
            }
        });
    }
    user_delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield connection_1.connect();
            try {
                const result = yield conn.query('DELETE FROM user WHERE id_user = ?', req.params.id);
                if (result[0].affectedRows > 0) {
                    return res.status(200).json({
                        results: 'Usuario Eliminado'
                    });
                }
                else {
                    return res.status(409).json({
                        results: 'No se encontro el usuario'
                    });
                }
            }
            catch (error) {
                return res.status(400).json({
                    result: error
                });
            }
        });
    }
}
exports.default = new UserController();
