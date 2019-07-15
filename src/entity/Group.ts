import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from "typeorm";
import {User} from "./User";

@Entity()
export class Group {

    constructor(id: number, name: string, level: number) {
        this.id = id;
        this.name = name;
        this.level = level;
    }


    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    level: number;

    @ManyToMany(() => User, user => user.groups)
    groups: Group[];

}
