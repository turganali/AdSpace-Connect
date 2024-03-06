import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IJwtServicePayload } from '../../../domain/adapters/jwt.interface';

import { EnvConfigService } from '../../config/env-config/env-config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly envConfigService: EnvConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: envConfigService.getJwtSecret(),
    });
  }

  async validate(payload: IJwtServicePayload) {
    return { ...payload };
  }
}
