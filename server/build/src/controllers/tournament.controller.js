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
class TournamentController {
    tournament_getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield connection_1.connect();
            try {
                const result = yield conn.query(`SELECT * FROM tournament`);
                if (converts_1.convertToJson(result).length > 0) {
                    return res.status(200).json({
                        results: result[0]
                    });
                }
                else {
                    return res.status(409).json({
                        message: 'No existen torneos'
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
    tournament_get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield connection_1.connect();
            try {
                const result = yield conn.query(`SELECT * FROM tournament WHERE id_tournament = ?`, req.params.id);
                if (converts_1.convertToJson(result).length > 0) {
                    return res.status(200).json({
                        results: result[0]
                    });
                }
                else {
                    return res.status(409).json({
                        message: 'No existe ese torneo'
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
    tournament_insert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield connection_1.connect();
            try {
                const result = yield conn.query(`SELECT * FROM tournament WHERE name = ?`, req.body.name);
                if (converts_1.convertToJson(result).length > 0) {
                    return res.status(409).json({
                        message: 'Ya existe ese torneo'
                    });
                }
                else {
                    let newTournament = req.body;
                    const result = yield conn.query('INSERT INTO tournament SET ?', [newTournament]);
                    return res.status(200).json({
                        message: 'Registración correcta del torneo',
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
    tournament_update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tournament = req.body;
            const conn = yield connection_1.connect();
            try {
                const result = yield conn.query('UPDATE tournament SET ? WHERE id_tournament = ?', [tournament, req.params.id]);
                if (result[0].affectedRows > 0) {
                    return res.status(200).json({
                        results: result[0].affectedRows,
                        message: 'Torneo actualizado'
                    });
                }
                else {
                    return res.status(409).json({
                        results: 'No se encontro el torneo'
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
    tournament_delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield connection_1.connect();
            try {
                const result = yield conn.query('DELETE FROM tournament WHERE id_tournament = ?', req.params.id);
                if (result[0].affectedRows > 0) {
                    return res.status(200).json({
                        results: 'Torneo Eliminado'
                    });
                }
                else {
                    return res.status(409).json({
                        results: 'No se encontro el torneo'
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
exports.default = new TournamentController();
