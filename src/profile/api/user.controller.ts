import { QueryBus } from "@nestjs/cqrs";
import { UsersService } from "../application/services/users.service";
import { Controller, Post, Body, Res, Get, Param } from '@nestjs/common';
import { Result } from "typescript-result";
import { AppNotification } from "src/common/application/notifications/app.notification";
import { RegisterUserResponse } from "../application/transform/responses/register-user.response";
import { ApiController } from "src/common/api/api.controller";
import { RegisterUserRequest } from "../application/transform/requests/register-user.request";

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly queryBus: QueryBus
    ){}

    @Post()
    async register(@Body() registerUserRequest :RegisterUserRequest, @Res({passthrough: true}) response) : Promise<object> {
        try {
            const result: Result<AppNotification, RegisterUserResponse> = await this.usersService.register(registerUserRequest);
            if(result.isSuccess()) {
                return ApiController.created(response, result.value);
            }
            return ApiController.error(response, result.error.getErrors());
        }   catch (error) {
            return ApiController.serverError(response, error)
        }
    }
}