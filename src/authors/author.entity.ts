import { BaseEntity, Entity, ObjectID, ObjectIdColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

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
}
