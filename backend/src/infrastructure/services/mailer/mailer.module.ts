import { Module } from "@nestjs/common";
import { EnvConfigModule } from "src/infrastructure/config/env-config/env-config.module";
import { MailerService } from "src/infrastructure/services/mailer/mailer.service";

@Module({
    imports: [EnvConfigModule],
    providers: [MailerService],
    exports: [MailerService],
})
export class MailerModule {}