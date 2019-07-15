import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import {Photo} from "./Photo";

@Entity()
export class User {

    constructor(id, firstName, lastName, age, photo) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.photo = photo;
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

}
