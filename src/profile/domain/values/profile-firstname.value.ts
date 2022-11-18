import { AppNotification } from 'src/common/application/notifications/app.notification';
import { Column } from 'typeorm';
import { Result } from 'typescript-result';

export class ProfileFirstname {
  @Column('varchar', { name: 'name' })
  private readonly value: string;
  private static MAX_LENGTH = 250;

  private constructor(value: string) {
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }

  public static create(
    firstName: string,
  ): Result<AppNotification, ProfileFirstname> {
    const notification: AppNotification = new AppNotification();
    firstName = (firstName ?? '').trim();
    if (firstName === '') {
      notification.addError('firstName is required', null);
    }
    if (firstName.length > this.MAX_LENGTH) {
      notification.addError(
        'The maximum length of a name is ' +
          this.MAX_LENGTH +
          ' characters including spaces',
        null,
      );
      if (notification.hasErrors()) {
        return Result.error(notification);
      }
      return Result.ok(new ProfileFirstname(firstName));
    }
  }
}
