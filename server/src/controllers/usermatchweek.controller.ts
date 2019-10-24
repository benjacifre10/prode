import { Request, Response } from 'express';
import { connect } from './../config/connection';
import { User_Match_Week } from './../models/user_match_week.interface';
import { convertToJson } from './../helpers/converts';

class UserMatchWeekController {
    public async usermatchweek_get(req: Request, res: Response): Promise<Response> {
        const conn = await connect();
        console.log('hola');
        try {
            const result: any = await conn.query(
                `SELECT m.id_match_week,
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
                  GROUP BY m.id_match_week;`
            );
            if (convertToJson(result).length > 0) {
                return res.status(200).json({
                    results: result[0]
                });
            } else {
                return res.status(200).json({
                    results: -1,
                    message: 'No existen partidos para esa fecha'
                });
            }
        } catch (error) {
            return res.status(400).json({
                message: error
            })
        }
    }
}

export default new UserMatchWeekController();