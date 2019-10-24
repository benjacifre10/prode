import { Router } from 'express';
import teamController from './../controllers/team.controller';
import checkAuth from './../middlewares/check-auth';

class TeamRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router
            .get('/teams', checkAuth, teamController.team_getAll)
            .get('/team/:id', checkAuth, teamController.team_get)
            .post('/team', checkAuth, teamController.team_insert)
            .put('/team/:id', checkAuth, teamController.team_update)
            .delete('/team/:id', checkAuth, teamController.team_delete);
    }
}

export default new TeamRoutes().router;