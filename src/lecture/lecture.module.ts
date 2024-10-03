import { Module } from "@nestjs/common";
import { LectureController as Controller } from "./lecture.controller";
import { LectureUseCase } from "./lecture.useCase";
import { LectureService } from "./lecture.service";
import { LectureRepository } from "./lecture.repository";
import { LectureRepositoryInterface } from "./lecture.repository.interface";
import { LectureDomain } from "./domain/lecture.domain";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LectureEntity } from "./entity/lecture.entity";
import { UserModule } from "../user/user.module";

@Module({
    imports : [TypeOrmModule.forFeature([LectureEntity]), UserModule],
    controllers: [ Controller ],
    providers: [
        LectureUseCase,
        LectureService,
        LectureDomain,
        LectureRepository,
        { provide: LectureRepositoryInterface, useClass: LectureRepository},
    ],
    exports: [ LectureService, LectureDomain, LectureRepositoryInterface ]
})

export class LectureModule {}