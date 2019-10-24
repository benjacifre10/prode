import { Request, Response } from 'express';
import { connect } from './../config/connection';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from './../models/user.interface';
import { convertToJson } from './../helpers/converts';

class UserController {

    public async user_signup(req: Request, res: Response): Promise<Response> {
        const conn = await connect();
        try {
            const result: any = await conn.query(`SELECT * FROM user WHERE email = ?`, req.body.email);
            if (convertToJson(result).length > 0) {
                return res.status(409).json({
                    message: 'Ya existe ese usuario'
                });
            } else {
                let newUser: User = req.body;
                newUser.password = bcrypt.hashSync(req.body.password, 10);
                const result = await conn.query('INSERT INTO user SET ?', [newUser]);
                return res.status(200).json({
                    message: 'Registración correcta del usuario',
                    value: result[0]
                });
            }
        } catch(error) {
            return res.status(400).json({
                message: error
            });
        }
    }

    public async user_login(req: Request, res: Response): Promise<Response> {
        const conn = await connect();
        try {
            const result = await conn.query(`SELECT * FROM user WHERE email = ?`, req.body.email); 
            if (convertToJson(result).length > 0) {
                if (bcrypt.compareSync(req.body.password, Buffer.from(convertToJson(result)[0].password).toString())) {
                    const token = jwt.sign(
                        {
                            email: convertToJson(result)[0].email,
                            userId: convertToJson(result)[0].id_user
                        }, 
                        <any>process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    let user: User = {
                        id_user: convertToJson(result)[0].id_user,
                        email: convertToJson(result)[0].email,
                        name: convertToJson(result)[0].name,
                        surname: convertToJson(result)[0].surname,
                        id_user_type: convertToJson(result)[0].id_user_type
                    };
                    return res.status(200).json({
                        message: 'Usuario Encontrado',
                        user,
                        token: token
                    });
                } else {
                    return res.status(200).json({
                        message: 'usuario o contraseña mal'
                    });
                }
            } else {
                return res.status(409).json({
                    message: 'Datos incorrectos'
                });
            }
        } catch (error) {
            return res.status(400).json({
                message: error
            });
        }
    }

    public async user_getAll(req: Request, res: Response): Promise<Response> {
        const conn = await connect();
        try {
            const result: any = await conn.query(`SELECT * FROM user`);
            if (convertToJson(result).length > 0) {
                return res.status(200).json({
                    results: result[0]
                });
            } else {
                return res.status(409).json({
                    message: 'No existen usuarios'
                });
            } 
        } catch (error) {
            return res.status(400).json({
                message: error
            });
        }
    }

    public async user_get(req: Request, res: Response): Promise<Response> {
        const conn = await connect();
        try {
            const result: any = await conn.query(`SELECT * FROM user WHERE id_user = ?`, req.params.id);
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

    public async user_getByType(req: Request, res: Response): Promise<Response> {
        const conn = await connect();
        try {
            const result: any = await conn.query(`SELECT * FROM user WHERE id_user_type = ?`, req.params.id);
            if (convertToJson(result).length > 0) {
                return res.status(200).json({
                    results: result[0]
                });
            } else {
                return res.status(200).json({
                    results: -1,
                    message: 'No existen esos tipos de usuario'
                });
            } 
        } catch (error) {
            return res.status(400).json({
                message: error
            });
        }
    }

    public async user_update(req: Request, res: Response): Promise<Response> {
        const user: User = req.body;
        const conn = await connect();
        try {
            const result: any = await conn.query('UPDATE user SET ? WHERE id_user = ?', [user, req.params.id]);
            if (result[0].affectedRows > 0) {
                return res.status(200).json({
                    results: result[0].affectedRows,
                    message: 'Usuario actualizado'
                });
            } else {
                return res.status(409).json({
                    results: 'No se encontro el usuario'
                });
            }
        } catch (error) {
            return res.status(400).json({
                message: error
            });
        }
    }

    public async user_delete(req: Request, res: Response): Promise<Response> {
        const conn = await connect();
        try {
            const result: any = await conn.query('DELETE FROM user WHERE id_user = ?', req.params.id);
            if (result[0].affectedRows > 0) {
                return res.status(200).json({
                    results: 'Usuario Eliminado'
                });
            } else {
                return res.status(409).json({
                    results: 'No se encontro el usuario'
                });
            }
        } catch (error) {
            return res.status(400).json({
                result: error
            });
        }
    }

}

export default new UserController();
