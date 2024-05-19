import { UserServicesModule } from './domain/use-cases/user/user-services.module';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthServiceModule } from './domain/use-cases/auth';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard, RolesGuard } from './presentation/guards';
import { AuthController, UserController } from './presentation/controllers';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
    }),
    AuthServiceModule,
    UserServicesModule,
  ],
  controllers: [AuthController, UserController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
