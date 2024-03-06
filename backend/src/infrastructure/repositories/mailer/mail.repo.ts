import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailM } from 'src/domain/model/mail/mail';
import { IMailRepo } from 'src/domain/repositories/mail/mail.interface';
import {
  MAIL_STATUS,
  MailEntity,
} from 'src/infrastructure/entities/mail/mail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MailOrm implements IMailRepo {
  constructor(
    @InjectRepository(MailEntity) private readonly repo: Repository<MailEntity>,
  ) {}

  async save(payload: MailM) {
    return this.repo.save(payload);
  }

  async changeStatus(id: number) {
    return this.repo.update(id, { status: MAIL_STATUS.SENT });
  }
}
