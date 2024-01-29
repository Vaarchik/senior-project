import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    content: string;

    @Column({
        nullable: true
    })
    rate: number;

    @Column({
        nullable: true
    })
    reviews: string;


    @ManyToOne(() => User, (user) => user.books)
    owner: User;
}