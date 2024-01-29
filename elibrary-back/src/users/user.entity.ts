import { Book } from "src/books/book.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column({
        nullable: true,
    })
    name: string | null;

    @Column()
    password: string;

    @OneToMany(() => Book, (book) => book.owner)
    books: Book[];
}