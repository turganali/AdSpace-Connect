import { USER_ROLE } from "src/infrastructure/entities/user/user.entity";

export interface IUser {
    id: number;
    email: string;
    role: USER_ROLE;
    password: string;
}