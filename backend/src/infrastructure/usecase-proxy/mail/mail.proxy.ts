import { SendMailUseCase } from 'src/application/mail/send.usecase';
import { IMailerService } from 'src/domain/adapters/mailer.interface';
import { IMailRepo } from 'src/domain/repositories/mail/mail.interface';
import { MailOrm } from 'src/infrastructure/repositories/mailer/mail.repo';
import { MailerService } from 'src/infrastructure/services/mailer/mailer.service';
import { UseCaseProxy } from 'src/infrastructure/usecase-proxy/usecase-proxy';

export enum MailProxy {
  SEND_MAIL = 'MailProxySendMail',
}

export const mailProxyProviders = [
  {
    inject: [MailOrm, MailerService],
    provide: MailProxy.SEND_MAIL,
    useFactory: (repo: IMailRepo, mailerService: IMailerService) =>
      new UseCaseProxy(new SendMailUseCase(repo, mailerService)),
  },
];

export const mailProxyExports = [MailProxy.SEND_MAIL];
