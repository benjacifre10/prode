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
class WeekController {
    week_get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield connection_1.connect();
            try {
                const result = yield conn.query(`SELECT * 
                   FROM week 
                  WHERE id_fixture = ?`, req.params.id);
                if (converts_1.convertToJson(result).length > 0) {
                    return res.status(200).json({
                        results: result[0]
                    });
                }
                else {
                    return res.status(200).json({
                        results: -1,
                        message: 'No existen fechas para ese torneo'
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
    week_insert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield connection_1.connect();
            try {
                const result = yield conn.query(`SELECT * 
                   FROM week 
                  WHERE id_fixture = ?
                    AND number = ?`, [req.body.id_fixture, req.body.number]);
                if (converts_1.convertToJson(result).length > 0) {
                    return res.status(200).json({
                        message: 'Ya existe esa fecha para el torneo',
                        value: 0
                    });
                }
                else {
                    let newWeek = req.body;
                    const result = yield conn.query('INSERT INTO week SET ?', [newWeek]);
                    return res.status(200).json({
                        message: 'Registración correcta de la fecha',
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
    week_delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield connection_1.connect();
            try {
                const count = yield conn.query('SELECT * FROM match_week WHERE id_week = ?', req.params.id);
                if (converts_1.convertToJson(count).length > 0) {
                    return res.status(200).json({
                        results: -1,
                        message: 'Hay partidos asociadas a la fecha'
                    });
                }
                else {
                    const result = yield conn.query('DELETE FROM week WHERE id_week = ?', req.params.id);
                    if (result[0].affectedRows > 0) {
                        return res.status(200).json({
                            message: 'Fecha Eliminada'
                        });
                    }
                    else {
                        return res.status(200).json({
                            results: -1,
                            message: 'No se encontro la fecha'
                        });
                    }
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
exports.default = new WeekController();
