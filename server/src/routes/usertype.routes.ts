import { Router } from 'express';
import usertypeController from './../controllers/usertype.controller';
import checkAuth from './../middlewares/check-auth';

class UserTypesRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router
            .get('/usertypes', checkAuth, usertypeController.usertype_getAll)
            .get('/usertype/:id', checkAuth, usertypeController.usertype_get)
            .post('/usertype', checkAuth, usertypeController.usertype_insert)
            .put('/usertype/:id', checkAuth, usertypeController.usertype_update)
            .delete('/usertype/:id', checkAuth, usertypeController.usertype_delete);
    }
}

export default new UserTypesRoutes().router;