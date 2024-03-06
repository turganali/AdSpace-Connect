import { IUser } from "src/domain/interfaces/user/user.interface";
import { CreateUserM } from "src/domain/model/user/user.interface";
import { RegisterDto } from "src/presentation/user/dto/register.dto";

export interface IUserRepo {
    getByEmail(email: string): Promise<boolean>;
    register(payload: CreateUserM): Promise<IUser>;
    getOne(email: string): Promise<IUser | null>;
    login();
}