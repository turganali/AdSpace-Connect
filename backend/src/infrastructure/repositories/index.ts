import { MailOrm } from "src/infrastructure/repositories/mailer/mail.repo";
import { UserOrm } from "src/infrastructure/repositories/user/user.repo";

export const REPOSITORIES = [
    UserOrm,
    MailOrm
]