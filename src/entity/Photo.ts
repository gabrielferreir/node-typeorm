import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Photo {

    constructor(id: number, path: string, width: number, height: number, size: number) {
        this.id = id;
        this.path = path;
        this.width = width;
        this.height = height;
        this.size = size;
    }


    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    path: string;

    @Column()
    width: number;

    @Column()
    height: number;

    @Column()
    size: number;

}
