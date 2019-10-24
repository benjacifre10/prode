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
class UserTypeController {
    usertype_getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield connection_1.connect();
            try {
                const result = yield conn.query(`SELECT * FROM user_type`);
                if (converts_1.convertToJson(result).length > 0) {
                    return res.status(200).json({
                        results: result[0]
                    });
                }
                else {
                    return res.status(409).json({
                        message: 'No existen tipos de usuarios'
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
    usertype_get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield connection_1.connect();
            try {
                const result = yield conn.query(`SELECT * FROM user_type WHERE id_user_type = ?`, req.params.id);
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
    usertype_insert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield connection_1.connect();
            try {
                const result = yield conn.query(`SELECT * FROM user_type WHERE name = ?`, req.body.name);
                if (converts_1.convertToJson(result).length > 0) {
                    return res.status(409).json({
                        message: 'Ya existe ese tipo de usuario'
                    });
                }
                else {
                    let newUserType = req.body;
                    const result = yield conn.query('INSERT INTO user_type SET ?', [newUserType]);
                    return res.status(200).json({
                        message: 'Registración correcta del tipo de usuario',
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
    usertype_update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_type = req.body;
            const conn = yield connection_1.connect();
            try {
                const result = yield conn.query('UPDATE user_type SET ? WHERE id_user_type = ?', [user_type, req.params.id]);
                if (result[0].affectedRows > 0) {
                    return res.status(200).json({
                        results: result[0].affectedRows,
                        message: 'Tipo Usuario actualizado'
                    });
                }
                else {
                    return res.status(409).json({
                        results: 'No se encontro el tipo de usuario'
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
    usertype_delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield connection_1.connect();
            try {
                const result = yield conn.query('DELETE FROM user_type WHERE id_user_type = ?', req.params.id);
                if (result[0].affectedRows > 0) {
                    return res.status(200).json({
                        results: 'Tipo de Usuario Eliminado'
                    });
                }
                else {
                    return res.status(409).json({
                        results: 'No se encontro el tipo de usuario'
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
exports.default = new UserTypeController();
