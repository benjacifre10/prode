import { Request, Response } from 'express';
import { connect } from './../config/connection';
import { Team } from './../models/team.interface';
import { convertToJson } from './../helpers/converts';

class TeamController {

    
    public async team_getAll(req: Request, res: Response): Promise<Response> {
        const conn = await connect();
        try {
            const result: any = await conn.query(`SELECT * FROM team`);
            if (convertToJson(result).length > 0) {
                return res.status(200).json({
                    results: result[0]
                });
            } else {
                return res.status(409).json({
                    message: 'No existen equipos'
                });
            } 
        } catch (error) {
            return res.status(400).json({
                message: error
            });
        }
    }
    
    public async team_get(req: Request, res: Response): Promise<Response> {
        const conn = await connect();
        try {
            const result: any = await conn.query(`SELECT * FROM team WHERE id_team = ?`, req.params.id);
            if (convertToJson(result).length > 0) {
                return res.status(200).json({
                    results: result[0]
                });
            } else {
                return res.status(409).json({
                    message: 'No existe ese equipo'
                });
            } 
        } catch (error) {
            return res.status(400).json({
                message: error
            });
        }
    }
    
    public async team_insert(req: Request, res: Response): Promise<Response> {
        const conn = await connect();
        try {
            const result: any = await conn.query(`SELECT * FROM team WHERE name = ?`, req.body.name);
            if (convertToJson(result).length > 0) {
                return res.status(409).json({
                    message: 'Ya existe ese equipo'
                });
            } else {
                const newTeam: Team = req.body;
                const result = await conn.query('INSERT INTO team SET ?', [newTeam]);
                return res.status(200).json({
                    message: 'Registración correcta del equipo',
                    value: result[0]
                });
            }
        } catch(error) {
            return res.status(400).json({
                message: error
            });
        }
    }

    public async team_update(req: Request, res: Response): Promise<Response> {
        const team: Team = req.body;
        const conn = await connect();
        try {
            const result: any = await conn.query('UPDATE team SET ? WHERE id_team = ?', [team, req.params.id]);
            if (result[0].affectedRows > 0) {
                return res.status(200).json({
                    results: result[0].affectedRows,
                    message: 'Equipo actualizado'
                });
            } else {
                return res.status(409).json({
                    results: 'No se encontro el equipo'
                });
            }
        } catch (error) {
            return res.status(400).json({
                message: error
            });
        }
    }

    public async team_delete(req: Request, res: Response): Promise<Response> {
        const conn = await connect();
        try {
            const result: any = await conn.query('DELETE FROM team WHERE id_team = ?', req.params.id);
            if (result[0].affectedRows > 0) {
                return res.status(200).json({
                    results: 'Equipo Eliminado'
                });
            } else {
                return res.status(409).json({
                    results: 'No se encontro el equipo'
                });
            }
        } catch (error) {
            return res.status(400).json({
                result: error
            });
        }
    }

}

export default new TeamController();