import { AppNotification } from "src/common/application/notifications/app.notification";
import { Column } from "typeorm";
import { Result } from "typescript-result";

export class UserUsername {
    @Column('varchar', {name: 'name'})
    private readonly value: string;
    private static MAX_LENGTH = 100;

    private constructor(value: string) {
        this.value = value
    }

    public getValue(): string {
        return this.value
    }

    public static create(
        userName: string,
    ): Result<AppNotification, UserUsername> {
        const notification: AppNotification = new AppNotification();
        userName = (userName ?? '').trim();
        if (userName === '') {
            notification.addError('userName is required', null)
        }
        if (userName.length > this.MAX_LENGTH) {
            notification.addError(
                'The maximum length of a name is '+this.MAX_LENGTH+' characters including spaces', null
            );
            if (notification.hasErrors()) {
                return Result.error(notification);
            }
            return Result.ok(new UserUsername(userName));
        }
    }
}