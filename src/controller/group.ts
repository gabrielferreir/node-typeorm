import * as express from 'express';
import {Group} from "../entity/Group";
import GroupRepository from "../repository/group";

export default class GroupController {
    public path = '/group';
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
            name: req.body.name,
            level: req.body.level
        };

        const groupRepository = new GroupRepository();

        const group = new Group(null, params.name, params.level);
        await groupRepository.create(group);

        res.status(201).jsonp(group);
    }

    async read(req, res) {
        const groupRepository = new GroupRepository();
        const response = await groupRepository.read();
        res.status(400).jsonp(response);
    }

    async update(req, res) {

        const params = {
            id: req.params.id,
            name: req.body.name,
            level: req.body.level
        };

        const group = new Group(params.id, params.name, params.level);
        const repository = new GroupRepository();
        const response = await repository.updade(group);
        res.status(200).jsonp(response);
    }

    async delete(req, res) {
        const params = {
            id: req.params.id
        };

        const repository = new GroupRepository();
        const response = await repository.delete(params.id);
        res.status(200).jsonp(response);
    }

}
