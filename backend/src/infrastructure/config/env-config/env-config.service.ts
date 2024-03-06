import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IDatabaseConfig } from 'src/domain/config/database.interface';
import { IJwtConfig } from 'src/domain/config/jwt.interface';

@Injectable()
export class EnvConfigService implements IDatabaseConfig, IJwtConfig {
  constructor(private configService: ConfigService) {}

  /* JWT */
  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET') || '';
  }

  getJwtExpirationTime(): string {
    return this.configService.get<string>('JWT_EXPIRATION_TIME') || '';
  }

  getJwtRefreshSecret(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET') || '';
  }

  getJwtRefreshExpirationTime(): string {
    return (
      this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME') || ''
    );
  }

  /* DATABASE */
  getDatabaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST') || 'localhost';
  }

  getDatabasePort(): number {
    return this.configService.get<number>('DATABASE_PORT') || 5440;
  }

  getDatabaseUser(): string {
    return this.configService.get<string>('DATABASE_USER') || 'postgres';
  }

  getDatabasePassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD') || '';
  }

  getDatabaseName(): string {
    return this.configService.get<string>('DATABASE_NAME') || 'postgres';
  }

  getDatabaseSchema(): string {
    return this.configService.get<string>('DATABASE_SCHEMA') || 'public';
  }

  getMailerEmail(): string{
    return this.configService.get<string>('MAILER_EMAIL') 
  }

  getMailerPassword(): string{
    return this.configService.get<string>('MAILER_PASSWORD')
  }

}
