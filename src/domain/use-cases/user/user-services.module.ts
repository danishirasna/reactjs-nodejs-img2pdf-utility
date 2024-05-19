import { Module } from '@nestjs/common';
import { UserServices } from './user-services.service';
import { LoginFactoryService } from './login-factory.service';

@Module({
  imports: [],
  providers: [LoginFactoryService, UserServices],
  exports: [LoginFactoryService, UserServices],
})
export class UserServicesModule {}
