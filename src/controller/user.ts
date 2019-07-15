import * as express from 'express';
import {User} from "../entity/User";
import UserRepository from "../repository/user";

export default class UserController {
    public path = '/user';
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.post(this.path, this.create);
        this.router.get(this.path, this.read);
        this.router.put(`${this.path}/:id`, this.update);
        this.router.delete(`${this.path}/:id`, this.delete);
    }

    async create(req, res) {

        const params = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age
        };

        const user = new User(null, params.firstName, params.lastName, params.age);
        const repository = new UserRepository();
        await repository.create(user);

        res.status(201).jsonp(user);
    }

    async read(req, res) {
        const repository = new UserRepository();
        const response = await repository.read();
        res.status(400).jsonp(response);
    }

    async update(req, res) {
        const params = {
            id: req.params.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age
        };

        const user = new User(params.id, params.firstName, params.lastName, params.age);
        const repository = new UserRepository();
        const response = await repository.updade(user);
        res.status(200).jsonp(response);
    }

    async delete(req, res) {
        const params = {
            id: req.params.id
        };

        const repository = new UserRepository();
        const response = await repository.delete(params.id);
        res.status(200).jsonp(response);
    }

}
