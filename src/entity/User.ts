import {Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, JoinColumn, JoinTable} from "typeorm";
import {Photo} from "./Photo";
import {Group} from "./Group";

@Entity()
export class User {

    constructor(id, firstName, lastName, age, photo, groups) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.photo = photo;
        this.groups = groups;
    }


    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @OneToOne(() => Photo)
    @JoinColumn()
    photo: Photo;

    @ManyToMany(() => Group, groups => groups.groups)
    @JoinTable()
    groups: Group[];

}
