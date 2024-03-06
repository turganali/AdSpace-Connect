import { USER_ROLE } from 'src/infrastructure/entities/user/user.entity';

export class CreateUserM {
  email: string;
  password: string;
  name: string;
}

export class UserM {
  id: number;
  email: string;
  role: USER_ROLE;
}
