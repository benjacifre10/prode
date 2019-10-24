import { Router } from 'express';
import weekController from './../controllers/week.controller';
import checkAuth from './../middlewares/check-auth';

class WeekRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router
            .get('/week/:id', checkAuth, weekController.week_get)
            .post('/week', checkAuth, weekController.week_insert)
            .delete('/week/:id', checkAuth, weekController.week_delete);
    }
}

export default new WeekRoutes().router;