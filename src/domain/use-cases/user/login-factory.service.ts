import { Injectable } from '@nestjs/common';
import { LoginDto } from 'src/presentation/dtos';

@Injectable()
export class LoginFactoryService {
  userCredentials(loginDto: LoginDto) {
    const user: any = {};
    if (loginDto.email) {
      user.email = loginDto.email;
    }
    if (loginDto.username) {
      user.username = loginDto.username;
    }
    user.password = loginDto.password;
    return user;
  }
}
