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

    //강의 조회
    async lectures(reqDomain: LectureDomain, manager?: EntityManager): Promise<LectureEntity[]> {

        return this.lectureRepository.lectures(LectureMapper.DomainToEntity(reqDomain,), manager);

    }

    //강의 현원 추가
    async updateCurrent(domain: LectureDomain, manager?: EntityManager): Promise<number> {

        const result: UpdateResult = await this.lectureRepository.updateCurrent(LectureMapper.DomainToEntity(domain), manager);
        
        return result.affected;

    }

}
