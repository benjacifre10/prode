import { Request, Response } from 'express';
import { connect } from './../config/connection';
import { Tournament } from './../models/tournament.interface';
import { convertToJson } from './../helpers/converts';

class TournamentController {

    
    public async tournament_getAll(req: Request, res: Response): Promise<Response> {
        const conn = await connect();
        try {
            const result: any = await conn.query(`SELECT * FROM tournament`);
            if (convertToJson(result).length > 0) {
                return res.status(200).json({
                    results: result[0]
                });
            } else {
                return res.status(409).json({
                    message: 'No existen torneos'
                });
            } 
        } catch (error) {
            return res.status(400).json({
                message: error
            });
        }
    }
    
    public async tournament_get(req: Request, res: Response): Promise<Response> {
        const conn = await connect();
        try {
            const result: any = await conn.query(`SELECT * FROM tournament WHERE id_tournament = ?`, req.params.id);
            if (convertToJson(result).length > 0) {
                return res.status(200).json({
                    results: result[0]
                });
            } else {
                return res.status(409).json({
                    message: 'No existe ese torneo'
                });
            } 
        } catch (error) {
            return res.status(400).json({
                message: error
            });
        }
    }
    
    public async tournament_insert(req: Request, res: Response): Promise<Response> {
        const conn = await connect();
        try {
            const result: any = await conn.query(`SELECT * FROM tournament WHERE name = ?`, req.body.name);
            if (convertToJson(result).length > 0) {
                return res.status(409).json({
                    message: 'Ya existe ese torneo'
                });
            } else {
                let newTournament: Tournament = req.body;
                const result = await conn.query('INSERT INTO tournament SET ?', [newTournament]);
                return res.status(200).json({
                    message: 'Registración correcta del torneo',
                    value: result[0]
                });
            }
        } catch(error) {
            return res.status(400).json({
                message: error
            });
        }
    }

    public async tournament_update(req: Request, res: Response): Promise<Response> {
        const tournament: Tournament = req.body;
        const conn = await connect();
        try {
            const result: any = await conn.query('UPDATE tournament SET ? WHERE id_tournament = ?', [tournament, req.params.id]);
            if (result[0].affectedRows > 0) {
                return res.status(200).json({
                    results: result[0].affectedRows,
                    message: 'Torneo actualizado'
                });
            } else {
                return res.status(409).json({
                    results: 'No se encontro el torneo'
                });
            }
        } catch (error) {
            return res.status(400).json({
                message: error
            });
        }
    }

    public async tournament_delete(req: Request, res: Response): Promise<Response> {
        const conn = await connect();
        try {
            const result: any = await conn.query('DELETE FROM tournament WHERE id_tournament = ?', req.params.id);
            if (result[0].affectedRows > 0) {
                return res.status(200).json({
                    results: 'Torneo Eliminado'
                });
            } else {
                return res.status(409).json({
                    results: 'No se encontro el torneo'
                });
            }
        } catch (error) {
            return res.status(400).json({
                result: error
            });
        }
    }

}

export default new TournamentController();