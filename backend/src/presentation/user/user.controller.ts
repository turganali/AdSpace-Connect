import { Body, Controller, Inject, Post, Request, UseInterceptors } from '@nestjs/common';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { UserLoginUseCase } from 'src/application/user/login.usecase';
import { UserRegisterUseCase } from 'src/application/user/register.usecase';
import { UseCaseProxy } from 'src/infrastructure/usecase-proxy/usecase-proxy';
import { UserProxy } from 'src/infrastructure/usecase-proxy/user/user.proxy';
import { LoginDto, RegisterDto } from 'src/presentation/user/dto/register.dto';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserProxy.REGISTER_USE_CASE)
    private readonly userRegisterUseCaseProxy: UseCaseProxy<UserRegisterUseCase>,
    @Inject(UserProxy.LOGIN_USE_CASE)
    private readonly userLoginUseCaseProxy: UseCaseProxy<UserLoginUseCase>,
  ) {}

  @Post('register')
  @UseInterceptors(NoFilesInterceptor())
  async register(@Body() payload: RegisterDto) {
    return {
      statusCode: 200,
      user: await this.userRegisterUseCaseProxy.getInstance().execute(payload),
    };
  }

  @Post('login')
  @UseInterceptors(NoFilesInterceptor())
  async login(@Body() payload: LoginDto, @Request() request: any) {
    const { user, accessToken } = await this.userLoginUseCaseProxy
      .getInstance()
      .execute(payload);
    request.res.setHeader('Set-Cookie', [accessToken]);

    return {
      statusCode: 200,
      message: 'SUCCESS_LOGIN',
      data: {
        user,
      },
    };
  }
}
