import { IMailerService } from 'src/domain/adapters/mailer.interface';
import { MailM } from 'src/domain/model/mail/mail';
import { IMailRepo } from 'src/domain/repositories/mail/mail.interface';
import { MailDto } from 'src/presentation/mail/dto/mail.dto';

export class SendMailUseCase {
  constructor(
    private readonly mailRepo: IMailRepo,
    private readonly mailService: IMailerService,
  ) {}

  async execute(payload: MailDto) {
    const model = new MailM()

    model.email = payload.email;
    model.name = payload.name;
    model.text = payload.text;

    const mail = await this.mailRepo.save(model);

    await this.mailService.send(mail);

    return this.mailRepo.changeStatus(mail.id)
  }
}
