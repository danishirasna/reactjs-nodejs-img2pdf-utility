import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async generateHashCode(payload: any) {
    return await bcrypt.hash(
      payload,
      this.configService.get('SALT_WORK_FACTOR'),
    );
  }

  async generateAccessToken(user: any) {
    const payload = {
      id: user.id,
      name: user.username,
      email: user.email,
      role: user.role,
      firstname: user.firstname,
      lastname: user.lastname,
    };
    const at = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('SECRET'),
      expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRE'),
    });
    return at;
  }

  async generateTokens(params: any): Promise<any> {
    const getToken = await this.generateAccessToken(params);
    return getToken;
  }
}
