import { Request, Response } from 'express';
import { connect } from './../config/connection';
import { User_Token } from './../models/user_token.interface';
import { convertToJson } from './../helpers/converts';

class UserTokenController {

    
    public async usertoken_getAll(req: Request, res: Response): Promise<Response> {
        const conn = await connect();
        try {
            const result: any = await conn.query(`SELECT * FROM user_token`);
            if (convertToJson(result).length > 0) {
                return res.status(200).json({
                    results: result[0]
                });
            } else {
                return res.status(200).json({
                    results: -1,
                    message: 'No se registran usuarios con tokens'
                });
            } 
        } catch (error) {
            return res.status(400).json({
                message: error
            });
        }
    }
    
    public async usertoken_get(req: Request, res: Response): Promise<Response> {
        const conn = await connect();
        try {
            const result: any = await conn.query(`SELECT * FROM user_token WHERE id_user = ?`, req.params.id);
            if (convertToJson(result).length > 0) {
                return res.status(200).json({
                    results: result[0]
                });
            } else {
                return res.status(200).json({
                    results: -1,
                    message: 'El usuario no registra tokens'
                });
            } 
        } catch (error) {
            return res.status(400).json({
                message: error
            });
        }
    }
    
    public async usertoken_insert(req: Request, res: Response): Promise<Response> {
        const conn = await connect();
        try {
            const result: any = await conn.query(`SELECT * FROM user_token WHERE id_user = ?`, req.body.id_user);
            if (convertToJson(result).length > 0) {
                return res.status(200).json({
                    results: -1,
                    message: 'Ya existe ese usuario con token'
                });
            } else {
                let newUserToken: User_Token = req.body;
                const result = await conn.query('INSERT INTO user_token SET ?', [newUserToken]);
                return res.status(200).json({
                    results: result[0],
                    message: 'Registración correcta del token de usuario'
                });
            }
        } catch(error) {
            return res.status(400).json({
                message: error
            });
        }
    }

    public async usertoken_update(req: Request, res: Response): Promise<Response> {
        const user_token: User_Token = req.body;
        const conn = await connect();
        try {
            const result: any = await conn.query('UPDATE user_token SET ? WHERE id_user = ?', [user_token, req.params.id]);
            if (result[0].affectedRows > 0) {
                return res.status(200).json({
                    results: result[0].affectedRows,
                    message: 'Monto Token Usuario actualizado'
                });
            } else {
                return res.status(200).json({
                    results: -1,
                    message: 'No se encontro el usuario'
                });
            }
        } catch (error) {
            return res.status(400).json({
                message: error
            });
        }
    }

    public async usertoken_delete(req: Request, res: Response): Promise<Response> {
        const conn = await connect();
        try {
            const result: any = await conn.query('DELETE FROM user_token WHERE id_user = ?', req.params.id);
            if (result[0].affectedRows > 0) {
                return res.status(200).json({
                    results: result[0].affectedRows,
                    message: 'Usuario con Token Eliminado'
                });
            } else {
                return res.status(200).json({
                    results: -1,
                    message: 'El usuario no registra tokens'
                });
            }
        } catch (error) {
            return res.status(400).json({
                result: error
            });
        }
    }

}

export default new UserTokenController();