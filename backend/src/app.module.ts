import { Module } from '@nestjs/common';
import { EnvConfigModule } from 'src/infrastructure/config/env-config/env-config.module';
import { UseCaseProxyModule } from 'src/infrastructure/usecase-proxy/usecase-proxy.module';
import { MailModule } from 'src/presentation/mail/mail.module';
import { UserModule } from 'src/presentation/user/user.module';

@Module({
  imports: [
    UseCaseProxyModule.register(),
    EnvConfigModule,
    UserModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
