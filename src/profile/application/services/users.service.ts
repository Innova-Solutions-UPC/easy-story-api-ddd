import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterUserRequest } from '../requests/register-user.request';
import { Result } from 'typescript-result';
import { AppNotification } from 'src/common/application/notifications/app.notification';
import { RegisterUserResponse } from '../responses/register-user.response';
import { RegisterUserValidator } from '../validations/register-user.validator';

@Injectable()
export class UsersService {
  constructor(
    private commandBus: CommandBus,
    private registerUserValidator: RegisterUserValidator,
  ) {}

  async register(
    registerUser: RegisterUserRequest,
  ): Promise<Result<AppNotification, RegisterUserResponse>> {
    const notification: AppNotification =
      await this.registerUserValidator.validate(registerUser);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const registerUser: RegisterU
  }
}
