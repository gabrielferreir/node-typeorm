import * as express from 'express';
import {User} from "../entity/User";
import UserRepository from "../repository/user";
import {Photo} from "../entity/Photo";
import PhotoRepository from "../repository/photo";
import {Group} from "../entity/Group";

export default class UserController {
    public path = '/user';
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.post(this.path, this.create);
        this.router.get(this.path, this.read);
        this.router.get(`${this.path}/:id`, this.readOne);
        this.router.put(`${this.path}/:id`, this.update);
        this.router.delete(`${this.path}/:id`, this.delete);
    }

    async create(req, res,next) {

        try {
            const params = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                age: req.body.age,
                photo: {
                    path: req.body.photo.path,
                    width: req.body.photo.width,
                    height: req.body.photo.height,
                    size: req.body.photo.size
                },
                groups: req.body.groups
            };

            const userRepository = new UserRepository();
            const photoRepository = new PhotoRepository();
            const photo = params.photo.path ?
                new Photo(null, params.photo.path, params.photo.width, params.photo.height, params.photo.size) :
                null;

            if (photo)
                await photoRepository.create(photo);

            const groups = params.groups.map(item => new Group(item.id, item.name, item.level));

            const user = new User(null, params.firstName, params.lastName, params.age, photo, groups);
            await userRepository.create(user);

            res.status(201).jsonp(user);
        } catch (e) {
            next(e);
        }
    }

    async read(req, res) {
        const repository = new UserRepository();
        const response = await repository.read();
        res.status(200).jsonp(response);
    }

    async readOne(req, res) {
        const repository = new UserRepository();
        const response = await repository.readOne(req.params.id);
        res.status(200).json(response[0]);
    }

    async update(req, res) {

        try {
            const params = {
                id: +req.params.id,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                age: req.body.age,
                photo: {
                    path: req.body.photo.path,
                    width: req.body.photo.width,
                    height: req.body.photo.height,
                    size: req.body.photo.size
                },
                groups: req.body.groups
            };

            const userRepository = new UserRepository();
            const photoRepository = new PhotoRepository();

            const photo = params.photo.path ?
                new Photo(null, params.photo.path, params.photo.width, params.photo.height, params.photo.size) :
                null;

            if (photo)
                await photoRepository.create(photo);

            const groups = params.groups.map(item => new Group(item.id, item.name, item.level));

            const user = new User(params.id, params.firstName, params.lastName, params.age, photo, groups);

            const response = await userRepository.updade(user);

            res.status(200).jsonp(response);
        } catch (e) {
            console.log(e);
            res.status(500).send();
        }
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
