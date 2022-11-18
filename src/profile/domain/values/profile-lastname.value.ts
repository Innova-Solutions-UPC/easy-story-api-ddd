import { AppNotification } from "src/common/application/notifications/app.notification";
import { Column } from "typeorm";
import { Result } from "typescript-result";

export class ProfileLastname {
    @Column('varchar', {name: 'name'})
    private readonly value: string;
    private static MAX_LENGTH = 250;

    private constructor(value: string) {
        this.value = value;
    }

    public getValue(): string {
        return this.value;
    }

    public static create(lastName: string): Result<AppNotification, ProfileLastname> {
        const notification: AppNotification = new AppNotification();
        lastName = (lastName ?? '').trim();
        if(lastName === '') {
            notification.addError('lastName is required', null);
        }
        if(lastName.length > this.MAX_LENGTH) {
            notification.addError(
                'The maximum length of a name is '+ this.MAX_LENGTH +
                ' characters including spaces', null
            );
            if (notification.hasErrors()) {
                return Result.error(notification);
            }
            return Result.ok(new ProfileLastname(lastName))
        }
    }

}