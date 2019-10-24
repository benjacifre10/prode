import { Router } from 'express';
import usermatchweekController from './../controllers/usermatchweek.controller';
import checkAuth from './../middlewares/check-auth';

class UserMatchWeekRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router
            .get('/usermatchweek/:id', checkAuth, usermatchweekController.usermatchweek_get);
    }
}

export default new UserMatchWeekRoutes().router;