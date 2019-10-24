import { Router } from 'express';
import fixtureController from './../controllers/fixture.controller';
import checkAuth from './../middlewares/check-auth';

class FixtureRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router
            .get('/fixtures', checkAuth, fixtureController.fixture_getAll)
            .post('/fixture', checkAuth, fixtureController.fixture_insert)
            .delete('/fixture/:id', checkAuth, fixtureController.fixture_delete);
    }
}

export default new FixtureRoutes().router;