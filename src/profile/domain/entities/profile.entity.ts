import { Expose } from 'class-transformer';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ProfileFirstname } from '../values/profile-firstname.value';
import { ProfileLastname } from '../values/profile-lastname.value';
import { UserId } from '../values/user-id.value';

@Entity({
  name: 'profiles',
})
export class Profile {
  @PrimaryColumn('int', {name: 'id'})
  id: UserId;

  @Column((type) => ProfileFirstname, {prefix:false})
  firstName: ProfileFirstname;

  @Column({ length: 50, type: 'varchar' })
  lastName: ProfileLastname;

  @Column({ length: 250, type: 'varchar', default: '' })
  bio: string;

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @Expose()
  get initials(): string {
    return `${this.firstName[0]}${this.lastName[0]}`;
  }

  @Expose()
  get profilePicture(): string {
    return `https://ui-avatars.com/api/?name=${this.initials}`;
  }
}
