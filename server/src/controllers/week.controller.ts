import { Request, Response } from 'express';
import { connect } from './../config/connection';
import { Week } from './../models/week.interface';
import { convertToJson } from './../helpers/converts';

class WeekController {

    public async week_get(req: Request, res: Response): Promise<Response> {
        const conn = await connect();
        try {
            const result: any = await conn.query(
                `SELECT * 
                   FROM week 
                  WHERE id_fixture = ?`, req.params.id
            );
            if (convertToJson(result).length > 0) {
                return res.status(200).json({
                    results: result[0]
                });
            } else {
                return res.status(200).json({
                    results: -1,
                    message: 'No existen fechas para ese torneo'
                });
            } 
        } catch (error) {
            return res.status(400).json({
                message: error
            });
        }
    }
    
    public async week_insert(req: Request, res: Response): Promise<Response> {
        const conn = await connect();
        try {
            const result: any = await conn.query(
                `SELECT * 
                   FROM week 
                  WHERE id_fixture = ?
                    AND number = ?`, [req.body.id_fixture, req.body.number]);
            if (convertToJson(result).length > 0) {
                return res.status(200).json({
                    message: 'Ya existe esa fecha para el torneo',
                    value: 0
                });
            } else {
                let newWeek: Week = req.body;
                const result = await conn.query('INSERT INTO week SET ?', [newWeek]);
                return res.status(200).json({
                    message: 'Registración correcta de la fecha',
                    value: result[0]
                });
            }
        } catch(error) {
            return res.status(400).json({
                message: error
            });
        }
    }

    public async week_delete(req: Request, res: Response): Promise<Response> {
        const conn = await connect();
        try {
            const count: any = await conn.query('SELECT * FROM match_week WHERE id_week = ?', req.params.id);
            if (convertToJson(count).length > 0) {
                return res.status(200).json({
                    results: -1,
                    message: 'Hay partidos asociadas a la fecha'
                });
            } else {
                const result: any = await conn.query('DELETE FROM week WHERE id_week = ?', req.params.id);
                if (result[0].affectedRows > 0) {
                    return res.status(200).json({
                        message: 'Fecha Eliminada'
                    });
                } else {
                    return res.status(200).json({
                        results: -1,
                        message: 'No se encontro la fecha'
                    });
                }
            }
        } catch (error) {
            return res.status(400).json({
                result: error
            });
        }
    }
}

export default new WeekController();