import { Request, Response } from 'express';
import { connect } from './../config/connection';
import { User_Type } from './../models/user_type.interface';
import { convertToJson } from './../helpers/converts';

class UserTypeController {

    
    public async usertype_getAll(req: Request, res: Response): Promise<Response> {
        const conn = await connect();
        try {
            const result: any = await conn.query(`SELECT * FROM user_type`);
            if (convertToJson(result).length > 0) {
                return res.status(200).json({
                    results: result[0]
                });
            } else {
                return res.status(409).json({
                    message: 'No existen tipos de usuarios'
                });
            } 
        } catch (error) {
            return res.status(400).json({
                message: error
            });
        }
    }
    
    public async usertype_get(req: Request, res: Response): Promise<Response> {
        const conn = await connect();
        try {
            const result: any = await conn.query(`SELECT * FROM user_type WHERE id_user_type = ?`, req.params.id);
            if (convertToJson(result).length > 0) {
                return res.status(200).json({
                    results: result[0]
                });
            } else {
                return res.status(409).json({
                    message: 'No existe ese usuario'
                });
            } 
        } catch (error) {
            return res.status(400).json({
                message: error
            });
        }
    }
    
    public async usertype_insert(req: Request, res: Response): Promise<Response> {
        const conn = await connect();
        try {
            const result: any = await conn.query(`SELECT * FROM user_type WHERE name = ?`, req.body.name);
            if (convertToJson(result).length > 0) {
                return res.status(409).json({
                    message: 'Ya existe ese tipo de usuario'
                });
            } else {
                let newUserType: User_Type = req.body;
                const result = await conn.query('INSERT INTO user_type SET ?', [newUserType]);
                return res.status(200).json({
                    message: 'Registración correcta del tipo de usuario',
                    value: result[0]
                });
            }
        } catch(error) {
            return res.status(400).json({
                message: error
            });
        }
    }

    public async usertype_update(req: Request, res: Response): Promise<Response> {
        const user_type: User_Type = req.body;
        const conn = await connect();
        try {
            const result: any = await conn.query('UPDATE user_type SET ? WHERE id_user_type = ?', [user_type, req.params.id]);
            if (result[0].affectedRows > 0) {
                return res.status(200).json({
                    results: result[0].affectedRows,
                    message: 'Tipo Usuario actualizado'
                });
            } else {
                return res.status(409).json({
                    results: 'No se encontro el tipo de usuario'
                });
            }
        } catch (error) {
            return res.status(400).json({
                message: error
            });
        }
    }

    public async usertype_delete(req: Request, res: Response): Promise<Response> {
        const conn = await connect();
        try {
            const result: any = await conn.query('DELETE FROM user_type WHERE id_user_type = ?', req.params.id);
            if (result[0].affectedRows > 0) {
                return res.status(200).json({
                    results: 'Tipo de Usuario Eliminado'
                });
            } else {
                return res.status(409).json({
                    results: 'No se encontro el tipo de usuario'
                });
            }
        } catch (error) {
            return res.status(400).json({
                result: error
            });
        }
    }

}

export default new UserTypeController();