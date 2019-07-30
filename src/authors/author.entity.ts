import { BaseEntity, Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

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

  @Column({
    default: Date(),
  })
  createdAt: Date;

  @Column({
    default: Date(),
  })
  updatedAt: Date;
}
