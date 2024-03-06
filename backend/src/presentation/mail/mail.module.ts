import { Module } from "@nestjs/common";
import { UseCaseProxyModule } from "src/infrastructure/usecase-proxy/usecase-proxy.module";
import { MailController } from "src/presentation/mail/mail.controller";

@Module({
    imports: [UseCaseProxyModule.register()],
    providers: [MailController],
    controllers: [MailController],
})
export class MailModule {}