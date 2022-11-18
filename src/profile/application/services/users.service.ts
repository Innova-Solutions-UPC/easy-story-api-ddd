import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Result } from 'typescript-result';
import { AppNotification } from 'src/common/application/notifications/app.notification';
import { RegisterUserResponse } from '../transform/responses/register-user.response';
import { RegisterUserValidator } from '../validations/register-user.validator';
import { RegisterUser } from '../commands/register-user.command';
import { RegisterUserRequest } from '../transform/requests/register-user.request';

@Injectable()
export class UsersService {
  constructor(
    private commandBus: CommandBus,
    private registerUserValidator: RegisterUserValidator,
  ) {}

  async register(
    registerUserRequest: RegisterUserRequest,
  ): Promise<Result<AppNotification, RegisterUserResponse>> {
    const notification: AppNotification =
      await this.registerUserValidator.validate(registerUserRequest);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const registerUser: RegisterUser = new RegisterUser(
      registerUserRequest.email,
      registerUserRequest.password,
      registerUserRequest.username
    );
    const userId: number = await this.commandBus.execute(registerUser);
    const registerUserResponse: RegisterUserResponse = new RegisterUserResponse(
      userId,
      registerUser.email,
      registerUser.password,
      registerUser.username
    );
    return Result.ok(registerUserResponse);
  }
}
