import { Body, Controller, Inject, Post, UseInterceptors } from '@nestjs/common';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { SendMailUseCase } from 'src/application/mail/send.usecase';
import { MailProxy } from 'src/infrastructure/usecase-proxy/mail/mail.proxy';
import { UseCaseProxy } from 'src/infrastructure/usecase-proxy/usecase-proxy';
import { MailDto } from 'src/presentation/mail/dto/mail.dto';

@Controller('mail')
export class MailController {
  constructor(
    @Inject(MailProxy.SEND_MAIL)
    private readonly sendMailUseCaseProxy: UseCaseProxy<SendMailUseCase>,
  ) {}

  @Post('send')
  @UseInterceptors(NoFilesInterceptor())
  async sendMail(@Body() payload: MailDto) {
    
    await this.sendMailUseCaseProxy.getInstance().execute(payload);

    return {
      statusCode: 200,
      message: 'Письмо отправлено',
    };
  }
}
