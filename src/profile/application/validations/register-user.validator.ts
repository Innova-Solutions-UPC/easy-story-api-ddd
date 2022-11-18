import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/notifications/app.notification';
import { User } from 'src/profile/domain/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserRequest } from '../transform/requests/register-user.request';

@Injectable()
export class RegisterUserValidator {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  public async validate(
    registerUserRequest: RegisterUserRequest,
  ): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();
    const email: string = registerUserRequest.email.trim();
    if (email.length <= 0) {
      notification.addError('User email is required', null);
    }
    const username: string = registerUserRequest.username.trim();
    if (username.length <= 0) {
      notification.addError('User username is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    const product: User = await this.userRepository
      .createQueryBuilder()
      .where('email = :email', { email })
      .getOne();
    if (product != null) {
      notification.addError('User email is taken', null);
    }
    return notification;
  }
}
