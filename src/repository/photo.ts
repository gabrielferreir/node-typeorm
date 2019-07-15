import {getManager} from "typeorm";
import {Photo} from "../entity/Photo";

export default class PhotoRepository {

    async create(photo: Photo): Promise<Photo> {
        return await getManager().getRepository(Photo).save(photo);
    }

    async updade(photo: Photo) {
        return await getManager().getRepository(Photo).update(photo.id, photo);
    }

    async delete(id: any) {
        return await getManager().getRepository(Photo).delete(id);
    }
}
