import {
  Body,
  Controller,
  ForbiddenException,
  NotFoundException,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Public } from 'src/presentation/decorators';
import { BaseResponseDto, LoginDto } from '../dtos';
import { AuthService } from 'src/domain/use-cases/auth/auth-service.service';
import { Errors } from '../enums';
import { LoginFactoryService, UserServices } from 'src/domain/use-cases/user';

@ApiTags('Auth Management')
@Controller('api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private loginFactory: LoginFactoryService,
    private userService: UserServices,
  ) {}

  /**
   * Handles the user login process.
   * Validates user credentials, checks the existence and matches the password.
   * If successful, it generates and returns an access token.
   *
   * @param {LoginDto} loginCreds - The user login credentials.
   * @param {Response} response - The Express response object used to return the data.
   * @returns {Promise<BaseResponseDto>} A promise that resolves to the response object containing either access token or error.
   */
  @Public()
  @UsePipes(new ValidationPipe())
  @Post('/login')
  async login(@Body() loginCreds: LoginDto, @Res() response: Response) {
    const baseResponseDto: BaseResponseDto<any> = new BaseResponseDto();
    try {
      const query = {};
      const userCreds = this.loginFactory.userCredentials(loginCreds);

      if (userCreds.email) {
        query['email'] = userCreds.email.toLowerCase();
      } else if (userCreds.username) {
        query['username'] = userCreds.username.toLowerCase();
      } else {
        throw new ForbiddenException(Errors.USERNAME_OR_EMAIL_REQUIRED);
      }
      const user = (await this.userService.getUser(query)) as any;

      if (!user) {
        throw new NotFoundException(Errors.USER_NOT_EXIST);
      }

      if (user) {
        const isAuthenticate =
          await this.userService.getUserPassword(userCreds);
        if (isAuthenticate) {
          userCreds.role = 'user';
          userCreds.id = '1';
          delete userCreds.password; // Security best practice to not expose password
          const token = await this.authService.generateTokens(userCreds);
          baseResponseDto.successExec({ accessToken: token });
        } else throw new ForbiddenException(Errors.PASSWORD_DOES_NOT_MATCH);
      }
    } catch (e) {
      baseResponseDto.errorExec(e);
    }
    return baseResponseDto.disposeResponse(response);
  }
}
