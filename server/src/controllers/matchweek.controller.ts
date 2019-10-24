import { Request, Response } from 'express';
import { connect } from './../config/connection';
import { Match_Week } from './../models/match_week.interface';
import { convertToJson } from './../helpers/converts';

class MatchWeekController {

    public async matchweek_get(req: Request, res: Response): Promise<Response> {
        const conn = await connect();
        try {
            const result: any = await conn.query(
                `SELECT * 
                   FROM match_week 
                  WHERE id_week = ?`, req.params.id
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
            });
        }
    }
    
    public async matchweek_getByDate(req: Request, res: Response): Promise<Response> {
        const conn = await connect();
        try {
            const result: any = await conn.query(
                `SELECT * 
                   FROM match_week 
                  WHERE dateMatch >= ?`, req.body.dateMatch
            );
            if (convertToJson(result).length > 0) {
                return res.status(200).json({
                    results: result[0]
                });
            } else {
                return res.status(200).json({
                    results: -1,
                    message: 'No existen partidos mayores a esa fecha'
                });
            } 
        } catch (error) {
            return res.status(400).json({
                message: error
            });
        }
    }

    public async matchweek_insert(req: Request, res: Response): Promise<Response> {
        const conn = await connect();
        try {
            const result: any = await conn.query(
                `SELECT * 
                   FROM match_week 
                  WHERE id_week = ?
                    AND ((local = ? OR visitor = ?)
                     OR (local = ? OR visitor = ?))`, 
                    [req.body.id_week, req.body.local, req.body.local, req.body.visitor, req.body.visitor]);
            if (convertToJson(result).length > 0) {
                return res.status(200).json({
                    message: 'Ya existe ese equipo para la fecha',
                    value: 0
                });
            } else {
                let newMatchWeek: Match_Week = req.body;
                const result = await conn.query('INSERT INTO match_week SET ?', [newMatchWeek]);
                return res.status(200).json({
                    message: 'Registración correcta del partido',
                    value: result[0]
                });
            }
        } catch(error) {
            return res.status(400).json({
                message: error
            });
        }
    }

    public async matchweek_update(req: Request, res: Response): Promise<Response> {
        const match_week: Match_Week = req.body;
        const conn = await connect();
        try {
            const result: any = await conn.query('UPDATE match_week SET ? WHERE id_match_week = ?', [match_week, req.params.id]);
            if (result[0].affectedRows > 0) {
                return res.status(200).json({
                    results: result[0].affectedRows,
                    message: 'Partido actualizado'
                });
            } else {
                return res.status(200).json({          
                    results: -1,
                    message: 'No se encontro el partido'
                });
            }
        } catch (error) {
            return res.status(400).json({
                message: error
            });
        }
    }

    public async matchweek_delete(req: Request, res: Response): Promise<Response> {
        const conn = await connect();
        try {
            const result: any = await conn.query('DELETE FROM match_week WHERE id_match_week = ?', req.params.id);
            if (result[0].affectedRows > 0) {
                return res.status(200).json({
                    message: 'Partido Eliminado'
                });
            } else {
                return res.status(200).json({
                    results: -1,
                    message: 'No se encontro el partido'
                });
            }
        } catch (error) {
            return res.status(400).json({
                result: error
            });
        }
    }
}

export default new MatchWeekController();