import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from 'src/domain/interfaces/user/user.interface';
import { CreateUserM } from 'src/domain/model/user/user.interface';
import { IUserRepo } from 'src/domain/repositories/user/user.interface';
import { UserEntity } from 'src/infrastructure/entities/user/user.entity';
import { RegisterDto } from 'src/presentation/user/dto/register.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserOrm implements IUserRepo {
  constructor(
    @InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>,
  ) {}

  async getByEmail(email: string): Promise<boolean> {
    const entity = await this.repo.findOne({ where: { email } });

    return entity ? true : false;
  }

  async register(payload: CreateUserM): Promise<IUser> {
    return this.repo.save(payload);
  }

  async getOne(email: string): Promise<IUser | null> {
    return this.repo.findOne({ where: { email } });
  }

  async login() {}
}
