import App from './app';
import UserController from './controller/user';
import GroupController from "./controller/group";

const app = new App(
    [
        new UserController(),
        new GroupController()
    ],
    5000,
);

app.listen();
