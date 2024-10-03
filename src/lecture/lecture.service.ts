import { Injectable } from "@nestjs/common";
import { LectureDomain } from "./domain/lecture.domain";
import { LectureEntity } from "./entity/lecture.entity";
import { LectureMapper } from "./lecture.mapper";
import { EntityManager, UpdateResult } from "typeorm";
import { LectureRepositoryInterface } from "./lecture.repository.interface";

@Injectable()
export class LectureService {

    constructor(
        private readonly lectureRepository: LectureRepositoryInterface,
    ) {}

    async lectures(reqDomain: LectureDomain, manager?: EntityManager): Promise<LectureEntity[]> {

        return this.lectureRepository.lectures(LectureMapper.DomainToEntity(reqDomain,), manager);

    }

}
