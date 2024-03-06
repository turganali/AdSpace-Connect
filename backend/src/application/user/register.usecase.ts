import { BadRequestException } from '@nestjs/common';
import { IBcryptService } from 'src/domain/adapters/bcrypt.interface';
import { IUser } from 'src/domain/interfaces/user/user.interface';
import { CreateUserM, UserM } from 'src/domain/model/user/user.interface';
import { IUserRepo } from 'src/domain/repositories/user/user.interface';
import { RegisterDto } from 'src/presentation/user/dto/register.dto';

export class UserRegisterUseCase {
  constructor(
    private readonly userRepo: IUserRepo,
    private readonly bcryptService: IBcryptService,
  ) {}

  async execute(payload: RegisterDto) {

    const isExists = await this.userRepo.getByEmail(payload.email)

    if (isExists) throw new BadRequestException('Пользователь с таким логином уже существует')

    const model = new CreateUserM();
    const password = await this.bcryptService.hash(payload.password);

    model.email = payload.email;
    model.password = password;
    model.name = payload.name;

    const contract: IUser = await this.userRepo.register(model);

    return this.toModel(contract);
  }

  private toModel(contract: IUser): UserM {
    const model = new UserM();

    model.id = contract.id;
    model.email = contract.email;
    model.role = contract.role;

    return model;
  }
}
