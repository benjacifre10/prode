import { Request, Response } from 'express';

class InitialController {
    public initial = (req: Request, res: Response): Response => {
        return res.json({ message: 'principal' });
    }
}

export const initialController = new InitialController();