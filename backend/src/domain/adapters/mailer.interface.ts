import { MailM } from "src/domain/model/mail/mail";

export interface IMailerService {
    send(payload: MailM)
}