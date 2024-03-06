import { Injectable } from '@nestjs/common';
import { IMailerService } from 'src/domain/adapters/mailer.interface';
import * as NodeMail from 'nodemailer/lib/mailer';
import { EnvConfigService } from 'src/infrastructure/config/env-config/env-config.service';
import { createTransport } from 'nodemailer';
import { MailM } from 'src/domain/model/mail/mail';

@Injectable()
export class MailerService implements IMailerService {
  private transport: NodeMail;

  constructor(private readonly configService: EnvConfigService) {
    this.transport = createTransport({
      service: 'gmail',
      auth: {
        user: configService.getMailerEmail(),
        pass: configService.getMailerPassword(),
      },
    });
  }

  async send(payload: MailM) {
    const { email, name, text } = payload;
    try {
      await this.transport.sendMail({
        to: 'katenovdev@gmail.com',
        from: this.configService.getMailerEmail(),
        subject: 'Отклик с сайта',
        html: `почта для связи: ${email}, Имя: ${name} <br> ${text}`,
      });
    } catch (e) {
      console.log('mailer error');
      console.log(e);
    }
  }
}
