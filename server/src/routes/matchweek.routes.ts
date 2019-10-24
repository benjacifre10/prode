import { Router } from 'express';
import matchweekController from './../controllers/matchweek.controller';
import checkAuth from './../middlewares/check-auth';

class MatchWeekRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router
            .get('/matchweek/:id', checkAuth, matchweekController.matchweek_get)
            .post('/matchweek/date', checkAuth, matchweekController.matchweek_getByDate)
            .post('/matchweek', checkAuth, matchweekController.matchweek_insert)
            .put('/matchweek/:id', checkAuth, matchweekController.matchweek_update)
            .delete('/matchweek/:id', checkAuth, matchweekController.matchweek_delete);
    }
}

export default new MatchWeekRoutes().router;