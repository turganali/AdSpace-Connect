import { DynamicModule, Module } from '@nestjs/common';
import { EnvConfigModule } from 'src/infrastructure/config/env-config/env-config.module';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { BcryptModule } from 'src/infrastructure/services/bcrypt/bcrypt.module';
import { JwtServiceModule } from 'src/infrastructure/services/jwt/jwt.module';
import { MailerModule } from 'src/infrastructure/services/mailer/mailer.module';
import { mailProxyExports, mailProxyProviders } from 'src/infrastructure/usecase-proxy/mail/mail.proxy';
import {
  userProxyExports,
  userProxyProviders,
} from 'src/infrastructure/usecase-proxy/user/user.proxy';

@Module({
  imports: [BcryptModule, EnvConfigModule, RepositoriesModule, JwtServiceModule, MailerModule],
})
export class UseCaseProxyModule {
  static register(): DynamicModule {
    return {
      module: UseCaseProxyModule,
      providers: [...userProxyProviders, ...mailProxyProviders],
      exports: [...userProxyExports, ...mailProxyExports],
    };
  }
}
