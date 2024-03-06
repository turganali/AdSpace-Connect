import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum MAIL_STATUS {
  SENDING = 'SENDING',
  SENT = 'SENT',
}

@Entity('mail')
export class MailEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true, type: 'text' })
  text: string;

  @Column({ default: MAIL_STATUS.SENDING, enum: MAIL_STATUS })
  status: MAIL_STATUS;
}
