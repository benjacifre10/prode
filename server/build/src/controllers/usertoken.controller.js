"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("./../config/connection");
const converts_1 = require("./../helpers/converts");
class UserTokenController {
    usertoken_getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield connection_1.connect();
            try {
                const result = yield conn.query(`SELECT * FROM user_token`);
                if (converts_1.convertToJson(result).length > 0) {
                    return res.status(200).json({
                        results: result[0]
                    });
                }
                else {
                    return res.status(200).json({
                        results: -1,
                        message: 'No se registran usuarios con tokens'
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
    usertoken_get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield connection_1.connect();
            try {
                const result = yield conn.query(`SELECT * FROM user_token WHERE id_user = ?`, req.params.id);
                if (converts_1.convertToJson(result).length > 0) {
                    return res.status(200).json({
                        results: result[0]
                    });
                }
                else {
                    return res.status(200).json({
                        results: -1,
                        message: 'El usuario no registra tokens'
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
    usertoken_insert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield connection_1.connect();
            try {
                const result = yield conn.query(`SELECT * FROM user_token WHERE id_user = ?`, req.body.id_user);
                if (converts_1.convertToJson(result).length > 0) {
                    return res.status(200).json({
                        results: -1,
                        message: 'Ya existe ese usuario con token'
                    });
                }
                else {
                    let newUserToken = req.body;
                    const result = yield conn.query('INSERT INTO user_token SET ?', [newUserToken]);
                    return res.status(200).json({
                        results: result[0],
                        message: 'Registración correcta del token de usuario'
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
    usertoken_update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_token = req.body;
            const conn = yield connection_1.connect();
            try {
                const result = yield conn.query('UPDATE user_token SET ? WHERE id_user = ?', [user_token, req.params.id]);
                if (result[0].affectedRows > 0) {
                    return res.status(200).json({
                        results: result[0].affectedRows,
                        message: 'Monto Token Usuario actualizado'
                    });
                }
                else {
                    return res.status(200).json({
                        results: -1,
                        message: 'No se encontro el usuario'
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
    usertoken_delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield connection_1.connect();
            try {
                const result = yield conn.query('DELETE FROM user_token WHERE id_user = ?', req.params.id);
                if (result[0].affectedRows > 0) {
                    return res.status(200).json({
                        results: result[0].affectedRows,
                        message: 'Usuario con Token Eliminado'
                    });
                }
                else {
                    return res.status(200).json({
                        results: -1,
                        message: 'El usuario no registra tokens'
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
exports.default = new UserTokenController();
