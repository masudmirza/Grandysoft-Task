import { Router } from 'express';
import UserController from '../controllers/user';

export default class UserRoutes {
    router: Router;
    userController: UserController = new UserController();

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.post('/subscribe', this.userController.subscribeUser);
        this.router.get('/all', this.userController.getAllUsers);
        this.router.get('/count/', this.userController.getCountOfMyFriendsFriends);
        this.router.get('/friends/:userId', this.userController.getMyFriends);
        this.router.get('/max/following', this.userController.getMaxFollowingUsers);
        this.router.get('/not/following', this.userController.getNotFollowingUsers);
    }
}
