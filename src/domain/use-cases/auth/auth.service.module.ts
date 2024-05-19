import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth-service.service';
import { ConfigModule } from '@nestjs/config';
import { AtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({}), PassportModule, ConfigModule],
  providers: [AuthService, AtStrategy],
  exports: [AuthService, AtStrategy],
})
export class AuthServiceModule {}
