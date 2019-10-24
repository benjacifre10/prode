import { Request, Response } from 'express';
import { connect } from './../config/connection';
import { Fixture } from './../models/fixture.interface';
import { convertToJson } from './../helpers/converts';

class FixtureController {

    public async fixture_getAll(req: Request, res: Response): Promise<Response> {
        const conn = await connect();
        try {
            const result: any = await conn.query(
                `SELECT f.id_fixture,
                        f.id_tournament,
                        t.name 
                   FROM fixture f
                  INNER JOIN tournament t
                     ON f.id_tournament = t.id_tournament`
            );
            if (convertToJson(result).length > 0) {
                return res.status(200).json({
                    results: result[0]
                });
            } else {
                return res.status(409).json({
                    message: 'No existen fixtures'
                });
            } 
        } catch (error) {
            return res.status(400).json({
                message: error
            });
        }
    }
    
    public async fixture_insert(req: Request, res: Response): Promise<Response> {
        const conn = await connect();
        try {
            const result: any = await conn.query(`SELECT * FROM fixture WHERE id_tournament = ?`, req.body.id_tournament);
            if (convertToJson(result).length > 0) {
                return res.status(200).json({
                    message: 'Ya existe un fixture para ese torneo',
                    value: 0
                });
            } else {
                let newFixture: Fixture = req.body;
                const result = await conn.query('INSERT INTO fixture SET ?', [newFixture]);
                return res.status(200).json({
                    message: 'Registración correcta del fixture',
                    value: result[0]
                });
            }
        } catch(error) {
            return res.status(400).json({
                message: error
            });
        }
    }

    public async fixture_delete(req: Request, res: Response): Promise<Response> {
        const conn = await connect();
        try {
            const count: any = await conn.query('SELECT * FROM week WHERE id_fixture = ?', req.params.id);
            if (convertToJson(count).length > 0) {
                return res.status(409).json({
                    message: 'Hay fechas asociadas al fixture'
                });
            } else {
                const result: any = await conn.query('DELETE FROM fixture WHERE id_tournament = ?', req.params.id);
                if (result[0].affectedRows > 0) {
                    return res.status(200).json({
                        message: 'Fixture Eliminado'
                    });
                } else {
                    return res.status(409).json({
                        message: 'No se encontro el fixture'
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

export default new FixtureController();