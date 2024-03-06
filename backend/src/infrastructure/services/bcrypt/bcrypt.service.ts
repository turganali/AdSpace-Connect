import { Injectable } from '@nestjs/common';
import { IBcryptService } from 'src/domain/adapters/bcrypt.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService implements IBcryptService {
  async hash(hashString: string): Promise<string> {
    return await bcrypt.hash(hashString, 10);
  }

  async compare(password: string, hashPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }
}
