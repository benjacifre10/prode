import { Router } from 'express';
import tournamentController from './../controllers/tournament.controller';
import checkAuth from './../middlewares/check-auth';

class TournamentRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router
            .get('/tournaments', checkAuth, tournamentController.tournament_getAll)
            .get('/tournament/:id', checkAuth, tournamentController.tournament_get)
            .post('/tournament', checkAuth, tournamentController.tournament_insert)
            .put('/tournament/:id', checkAuth, tournamentController.tournament_update)
            .delete('/tournament/:id', checkAuth, tournamentController.tournament_delete);
    }
}

export default new TournamentRoutes().router;