import {
  BaseEntity,
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  AfterRemove,
  getMongoManager,
} from 'typeorm';

@Entity()
export class Author extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  birthday: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // @OneToMany(type => Book, book => book.author, {eager: true})
  // books: Book[];
}
