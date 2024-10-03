import { Module } from "@nestjs/common";
import { RegisterController } from "./register.controller";
import { RegisterUseCase } from "./register.useCase";
import { RegisterRepository } from "./register.repository";
import { RegisterRepositoryInterface } from "./register.repository.interface";
import { UserModule } from "../user/user.module";
import { LectureModule } from "../lecture/lecture.module";
import { RegisterDomain } from "./domain/register.domain";
import { RegisterService } from "./register.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RegisterEntity } from "./entity/register.entity";

@Module({
    imports: [UserModule, LectureModule, TypeOrmModule.forFeature([RegisterEntity])],
    controllers: [RegisterController],
    providers: [
        RegisterUseCase,
        RegisterService,
        RegisterDomain,
        RegisterRepository,
        { provide: RegisterRepositoryInterface, useClass: RegisterRepository},
    ]
    , exports: [ RegisterService, RegisterDomain, RegisterRepositoryInterface ]
})

export class RegisterModule {}