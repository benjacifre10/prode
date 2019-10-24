import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const checkAuth: any = (req: Request, res: Response, next: NextFunction) => {
    //Get the jwt token from the head
    const token = <string>req.headers["authorization"];
    let jwtPayload;
  
    //Try to validate the token and get data
    try {
        jwtPayload = <any>jwt.verify(token, <any>process.env.JWT_KEY);
        res.locals.jwtPayload = jwtPayload;
        console.log('resultado', jwtPayload);
    } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
        res.status(401).send();
        return;
    }

    //The token is valid for 1 hour
    //We want to send a new token on every request
    const { userId, username } = jwtPayload;
    const newToken = jwt.sign({ userId, username }, <any>process.env.JWT_KEY, {
        expiresIn: "1h"
    });
    res.setHeader("token", newToken);
    //Call the next middleware or controller
    next();
    
};

export default checkAuth;