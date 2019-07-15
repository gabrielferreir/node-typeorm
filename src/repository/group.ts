import {getConnection, getManager} from "typeorm";
import {Group} from "../entity/Group";

export default class GroupRepository {

    async create(group: Group): Promise<Group> {
        return await getManager().getRepository(Group).save(group);
    }

    async updade(group: Group) {
        return await getManager().getRepository(Group).update(group.id, group);
    }

    async delete(id: any) {
        return await getManager().getRepository(Group).delete(id);
    }

    async read() {
        return await getManager().getRepository(Group).find();
    }
}
