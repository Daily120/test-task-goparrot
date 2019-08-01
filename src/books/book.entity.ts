import {
  BaseEntity,
  Entity,
  ObjectID,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ObjectIdColumn,
  ManyToOne,
  Unique,
} from 'typeorm';
import { Author } from '../authors/author.entity';

@Entity()
@Unique(['iban'])
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

  // @ManyToOne(type => Author, author => author.books, { eager: false })
  // author: Author;

  @Column('rowid')
  author: string;
}
