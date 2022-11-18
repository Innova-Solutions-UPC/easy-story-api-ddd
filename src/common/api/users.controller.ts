import { UsersService } from 'src/profile/application/services/users.service';
import { QueryBus } from '@nestjs/cqrs';

export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly queryBus: QueryBus,
  ) {}
}
