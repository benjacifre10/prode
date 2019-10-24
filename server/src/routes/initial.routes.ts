import { Router } from 'express';
import { initialController } from './../controllers/initial.controller';

class InitialRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router
            .get('/', initialController.initial);
    }
}

export default new InitialRoutes().router;