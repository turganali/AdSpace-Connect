import { Module } from '@nestjs/common';
import { UseCaseProxyModule } from 'src/infrastructure/usecase-proxy/usecase-proxy.module';
import { UserController } from 'src/presentation/user/user.controller';

@Module({
  imports: [UseCaseProxyModule.register()],
  providers: [],
  controllers: [UserController],
})
export class UserModule {}
