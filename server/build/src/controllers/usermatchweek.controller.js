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
class UserMatchWeekController {
    usermatchweek_get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield connection_1.connect();
            console.log('hola');
            try {
                const result = yield conn.query(`SELECT m.id_match_week,
                        m.local,
                        t1.name AS localname,
                        t1.acronym AS localacronym,
                        t1.shield AS localshield,
                        m.visitor,
                        t2.name AS visitorname,
                        t2.acronym AS visitoracronym,
                        t2.shield AS visitorshield,
                        m.goals_for AS matchgoals_for,
                        u.goals_for AS usergoals_for,
                        m.goals_against AS matchgoals_against,
                        u.goals_against AS usergoals_against,
                        u.score,
                        m.dateMatch,
                        m.id_week
                   FROM match_week m
                  INNER JOIN team t1
                     ON m.local = t1.id_team
                  INNER JOIN team t2
                     ON m.visitor = t2.id_team
                   LEFT JOIN user_match_week u
                     ON u.id_match_week = m.id_match_week
                  WHERE m.id_week = ${req.params.id}
                  GROUP BY m.id_match_week;`);
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
}
exports.default = new UserMatchWeekController();
