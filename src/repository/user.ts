import {getManager} from "typeorm";
import {User} from "../entity/User";

export default class UserRepository {

    async create(user: User): Promise<User> {
        return await getManager().getRepository(User).save(user);
    }

    async read(): Promise<Array<User>> {
        return await getManager().getRepository(User).find({ relations: ["photo"] });
    }

    async updade(user: User) {
        return await getManager().getRepository(User).update(user.id, user);
    }

    async delete(id: any) {
        return await getManager().getRepository(User).delete(id);
    }
}
