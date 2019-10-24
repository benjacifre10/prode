import { Router } from 'express';
import userController from './../controllers/user.controller';
import checkAuth from './../middlewares/check-auth';

class UserRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router
            .get('/users', checkAuth, userController.user_getAll)
            .get('/users/:id', checkAuth, userController.user_get)
            .get('/userstype/:id', checkAuth, userController.user_getByType)
            .post('/signup', userController.user_signup)
            .post('/login', userController.user_login)
            .put('/users/:id', checkAuth, userController.user_update)
            .delete('/users/:id', checkAuth, userController.user_delete);
    }
}

export default new UserRoutes().router;