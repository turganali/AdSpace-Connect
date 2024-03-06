import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum USER_ROLE {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
}

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: USER_ROLE.CUSTOMER, enum: USER_ROLE })
  role: USER_ROLE;
}
