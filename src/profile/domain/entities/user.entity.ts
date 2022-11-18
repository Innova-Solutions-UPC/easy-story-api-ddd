import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as argon2 from 'argon2';
import { Profile } from './profile.entity';
import { UserId } from '../values/user-id.value';
import { UserUsername } from '../values/user-username.value';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryColumn('int', {name: 'id'})
  id: UserId;

  @Column((type) => UserUsername, {prefix: false})
  username: string;

  @Column({ unique: true, length: 50, type: 'varchar' })
  email: string;

  @Exclude()
  @Column({ length: 96, type: 'varchar' })
  password: string;

  @Column({ default: false, type: 'boolean' })
  verified: boolean;

  @OneToOne(() => Profile, { cascade: true })
  @JoinColumn()
  profile: Profile;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      this.password = await argon2.hash(this.password);
    }
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await argon2.verify(this.password, attempt);
  }
}
