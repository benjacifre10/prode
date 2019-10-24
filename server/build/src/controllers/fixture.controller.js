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
class FixtureController {
    fixture_getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield connection_1.connect();
            try {
                const result = yield conn.query(`SELECT f.id_fixture,
                        f.id_tournament,
                        t.name 
                   FROM fixture f
                  INNER JOIN tournament t
                     ON f.id_tournament = t.id_tournament`);
                if (converts_1.convertToJson(result).length > 0) {
                    return res.status(200).json({
                        results: result[0]
                    });
                }
                else {
                    return res.status(409).json({
                        message: 'No existen fixtures'
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
    fixture_insert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield connection_1.connect();
            try {
                const result = yield conn.query(`SELECT * FROM fixture WHERE id_tournament = ?`, req.body.id_tournament);
                if (converts_1.convertToJson(result).length > 0) {
                    return res.status(200).json({
                        message: 'Ya existe un fixture para ese torneo',
                        value: 0
                    });
                }
                else {
                    let newFixture = req.body;
                    const result = yield conn.query('INSERT INTO fixture SET ?', [newFixture]);
                    return res.status(200).json({
                        message: 'Registración correcta del fixture',
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
    fixture_delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield connection_1.connect();
            try {
                const count = yield conn.query('SELECT * FROM week WHERE id_fixture = ?', req.params.id);
                if (converts_1.convertToJson(count).length > 0) {
                    return res.status(409).json({
                        message: 'Hay fechas asociadas al fixture'
                    });
                }
                else {
                    const result = yield conn.query('DELETE FROM fixture WHERE id_tournament = ?', req.params.id);
                    if (result[0].affectedRows > 0) {
                        return res.status(200).json({
                            message: 'Fixture Eliminado'
                        });
                    }
                    else {
                        return res.status(409).json({
                            message: 'No se encontro el fixture'
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
exports.default = new FixtureController();
