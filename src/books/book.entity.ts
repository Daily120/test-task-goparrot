import { BaseEntity, Entity, ObjectID, CreateDateColumn, UpdateDateColumn, Column, ObjectIdColumn, ManyToMany } from '../../node_modules/typeorm';
import { Author } from '../authors/author.entity';

@Entity()
export class Book extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    title: string;

    @Column()
    iban: string;

    @Column()
    publishedAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
