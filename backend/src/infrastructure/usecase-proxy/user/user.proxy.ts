import { UserLoginUseCase } from 'src/application/user/login.usecase';
import { UserRegisterUseCase } from 'src/application/user/register.usecase';
import { IBcryptService } from 'src/domain/adapters/bcrypt.interface';
import { IJwtService } from 'src/domain/adapters/jwt.interface';
import { IJwtConfig } from 'src/domain/config/jwt.interface';
import { IUserRepo } from 'src/domain/repositories/user/user.interface';
import { EnvConfigService } from 'src/infrastructure/config/env-config/env-config.service';
import { UserOrm } from 'src/infrastructure/repositories/user/user.repo';
import { BcryptService } from 'src/infrastructure/services/bcrypt/bcrypt.service';
import { JwtTokenService } from 'src/infrastructure/services/jwt/jwt.service';
import { UseCaseProxy } from 'src/infrastructure/usecase-proxy/usecase-proxy';

export enum UserProxy {
  REGISTER_USE_CASE = 'UserProxyRegisterUseCaseProxy',
  LOGIN_USE_CASE = 'UserProxyLoginUseCaseProxy',
}

export const userProxyProviders = [
  {
    inject: [UserOrm, BcryptService],
    provide: UserProxy.REGISTER_USE_CASE,
    useFactory: (repo: IUserRepo, bcryptService: IBcryptService) =>
      new UseCaseProxy(new UserRegisterUseCase(repo, bcryptService)),
  },

  {
    inject: [UserOrm, BcryptService, JwtTokenService, EnvConfigService],
    provide: UserProxy.LOGIN_USE_CASE,
    useFactory: (
      repo: IUserRepo,
      bcryptService: IBcryptService,
      jwtService: IJwtService,
      jwtConfig: IJwtConfig,
    ) =>
      new UseCaseProxy(
        new UserLoginUseCase(repo, bcryptService, jwtService, jwtConfig),
      ),
  },
];

export const userProxyExports = [
  UserProxy.REGISTER_USE_CASE,
  UserProxy.LOGIN_USE_CASE,
];
