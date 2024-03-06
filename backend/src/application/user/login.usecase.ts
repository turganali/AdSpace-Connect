import { BadRequestException } from '@nestjs/common';
import { IBcryptService } from 'src/domain/adapters/bcrypt.interface';
import {
  IJwtService,
  IJwtServicePayload,
} from 'src/domain/adapters/jwt.interface';
import { IJwtConfig } from 'src/domain/config/jwt.interface';
import { IUser } from 'src/domain/interfaces/user/user.interface';
import { IUserRepo } from 'src/domain/repositories/user/user.interface';
import { LoginDto, RegisterDto } from 'src/presentation/user/dto/register.dto';

export class UserLoginUseCase {
  constructor(
    private readonly userRepo: IUserRepo,
    private readonly bcryptService: IBcryptService,
    private readonly jwtService: IJwtService,
    private readonly jwtConfig: IJwtConfig,
  ) {}

  async execute(payload: LoginDto) {
    const contract: IUser | null = await this.userRepo.getOne(payload.email);

    if (!contract)
      throw new BadRequestException(
        'Пользователя с таким логином не существует',
      );

    if (
      !(await this.bcryptService.compare(payload.password, contract.password))
    )
      throw new BadRequestException('Неверный пароль или логин');

    const accessToken = this.getCookieWithJwtToken(contract);
    delete contract.password;

    return {
      user: contract,
      accessToken,
    };
  }

  private getCookieWithJwtToken(user: IUser) {
    const secret = this.jwtConfig.getJwtSecret();
    const expiresIn = `${this.jwtConfig.getJwtRefreshExpirationTime()}s`;

    const payload: IJwtServicePayload = {
      userId: user.id,
      role: user.role,
    };
    const token = this.jwtService.createToken(payload, secret, expiresIn);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtExpirationTime()}`;
  }
}
