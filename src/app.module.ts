import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './profile/api/user.controller';
import { UsersService } from './profile/application/services/users.service';
import { RegisterUserValidator } from './profile/application/validations/register-user.validator';
import { User } from './profile/domain/entities/user.entity';

/* export const CommandHandlers = [RegisterProductHandler];
export const EventHandlers = [ProductRegisteredHandler];
export const QueryHandlers = [GetAllProductsHandler, GetProductByIdHandler]; */


@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService, RegisterUserValidator],
})
export class AppModule {}
