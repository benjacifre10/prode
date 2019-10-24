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
class TeamController {
    team_getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield connection_1.connect();
            try {
                const result = yield conn.query(`SELECT * FROM team`);
                if (converts_1.convertToJson(result).length > 0) {
                    return res.status(200).json({
                        results: result[0]
                    });
                }
                else {
                    return res.status(409).json({
                        message: 'No existen equipos'
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
    team_get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield connection_1.connect();
            try {
                const result = yield conn.query(`SELECT * FROM team WHERE id_team = ?`, req.params.id);
                if (converts_1.convertToJson(result).length > 0) {
                    return res.status(200).json({
                        results: result[0]
                    });
                }
                else {
                    return res.status(409).json({
                        message: 'No existe ese equipo'
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
    team_insert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield connection_1.connect();
            try {
                const result = yield conn.query(`SELECT * FROM team WHERE name = ?`, req.body.name);
                if (converts_1.convertToJson(result).length > 0) {
                    return res.status(409).json({
                        message: 'Ya existe ese equipo'
                    });
                }
                else {
                    const newTeam = req.body;
                    const result = yield conn.query('INSERT INTO team SET ?', [newTeam]);
                    return res.status(200).json({
                        message: 'Registración correcta del equipo',
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
    team_update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const team = req.body;
            const conn = yield connection_1.connect();
            try {
                const result = yield conn.query('UPDATE team SET ? WHERE id_team = ?', [team, req.params.id]);
                if (result[0].affectedRows > 0) {
                    return res.status(200).json({
                        results: result[0].affectedRows,
                        message: 'Equipo actualizado'
                    });
                }
                else {
                    return res.status(409).json({
                        results: 'No se encontro el equipo'
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
    team_delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield connection_1.connect();
            try {
                const result = yield conn.query('DELETE FROM team WHERE id_team = ?', req.params.id);
                if (result[0].affectedRows > 0) {
                    return res.status(200).json({
                        results: 'Equipo Eliminado'
                    });
                }
                else {
                    return res.status(409).json({
                        results: 'No se encontro el equipo'
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
exports.default = new TeamController();
