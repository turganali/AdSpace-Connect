import { USER_ROLE } from "src/infrastructure/entities/user/user.entity";

export interface IJwtServicePayload {
    userId: number;
    role: USER_ROLE;
  }
  
  export interface IJwtService {
    checkToken(token: string): Promise<any>;
    createToken(
      payload: IJwtServicePayload,
      secret: string,
      expiresIn: string,
    ): string;
  }
  