import { MailM } from "src/domain/model/mail/mail";

export interface IMailRepo {
    save(payload: MailM),
    changeStatus(id: number)
}