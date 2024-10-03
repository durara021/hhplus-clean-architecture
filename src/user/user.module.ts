import { Module } from "@nestjs/common";
import { UserController as Controller } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
import { UserRepositoryInterface } from "./user.repository.interface";
import { UserUseCase } from "./user.useCase";
import { UserDomain } from "./domain/user.domain";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])], 
    controllers: [Controller],
    providers: [
        UserUseCase,
        UserService,
        UserDomain,
        UserRepository,
        { provide: UserRepositoryInterface, useClass: UserRepository},
    ]
    ,exports: [ UserService, UserDomain, UserRepositoryInterface ]
})

export class UserModule {}