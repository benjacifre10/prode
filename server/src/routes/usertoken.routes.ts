import { Router } from 'express';
import usertokenController from './../controllers/usertoken.controller';
import checkAuth from './../middlewares/check-auth';

class UserTokensRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router
            .get('/usertokens', checkAuth, usertokenController.usertoken_getAll)
            .get('/usertoken/:id', checkAuth, usertokenController.usertoken_get)
            .post('/usertoken', checkAuth, usertokenController.usertoken_insert)
            .put('/usertoken/:id', checkAuth, usertokenController.usertoken_update)
            .delete('/usertoken/:id', checkAuth, usertokenController.usertoken_delete);
    }
}

export default new UserTokensRoutes().router;