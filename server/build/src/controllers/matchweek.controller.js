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
class MatchWeekController {
    matchweek_get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield connection_1.connect();
            try {
                const result = yield conn.query(`SELECT * 
                   FROM match_week 
                  WHERE id_week = ?`, req.params.id);
                if (converts_1.convertToJson(result).length > 0) {
                    return res.status(200).json({
                        results: result[0]
                    });
                }
                else {
                    return res.status(200).json({
                        results: -1,
                        message: 'No existen partidos para esa fecha'
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
    matchweek_getByDate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield connection_1.connect();
            try {
                const result = yield conn.query(`SELECT * 
                   FROM match_week 
                  WHERE dateMatch >= ?`, req.body.dateMatch);
                if (converts_1.convertToJson(result).length > 0) {
                    return res.status(200).json({
                        results: result[0]
                    });
                }
                else {
                    return res.status(200).json({
                        results: -1,
                        message: 'No existen partidos mayores a esa fecha'
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
    matchweek_insert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield connection_1.connect();
            try {
                const result = yield conn.query(`SELECT * 
                   FROM match_week 
                  WHERE id_week = ?
                    AND ((local = ? OR visitor = ?)
                     OR (local = ? OR visitor = ?))`, [req.body.id_week, req.body.local, req.body.local, req.body.visitor, req.body.visitor]);
                if (converts_1.convertToJson(result).length > 0) {
                    return res.status(200).json({
                        message: 'Ya existe ese equipo para la fecha',
                        value: 0
                    });
                }
                else {
                    let newMatchWeek = req.body;
                    const result = yield conn.query('INSERT INTO match_week SET ?', [newMatchWeek]);
                    return res.status(200).json({
                        message: 'Registración correcta del partido',
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
    matchweek_update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const match_week = req.body;
            const conn = yield connection_1.connect();
            try {
                const result = yield conn.query('UPDATE match_week SET ? WHERE id_match_week = ?', [match_week, req.params.id]);
                if (result[0].affectedRows > 0) {
                    return res.status(200).json({
                        results: result[0].affectedRows,
                        message: 'Partido actualizado'
                    });
                }
                else {
                    return res.status(200).json({
                        results: -1,
                        message: 'No se encontro el partido'
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
    matchweek_delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield connection_1.connect();
            try {
                const result = yield conn.query('DELETE FROM match_week WHERE id_match_week = ?', req.params.id);
                if (result[0].affectedRows > 0) {
                    return res.status(200).json({
                        message: 'Partido Eliminado'
                    });
                }
                else {
                    return res.status(200).json({
                        results: -1,
                        message: 'No se encontro el partido'
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
exports.default = new MatchWeekController();
