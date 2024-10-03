import { Injectable } from "@nestjs/common";
import { LectureRepositoryInterface } from "./lecture.repository.interface";
import { LectureEntity } from "./entity/lecture.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class LectureRepository implements LectureRepositoryInterface {
    constructor(
        @InjectRepository(LectureEntity)
        private readonly repository: Repository<LectureEntity>,
    ) {}

    //특정강의 조회 기능
    async lectures(entity: LectureEntity, manager: EntityManager): Promise<LectureEntity[]> {

        // QueryBuilder를 사용하여 동적으로 AND 조건 적용
        let queryBuilder = this.repository.createQueryBuilder('lecture');
        if(manager) {
            queryBuilder = manager.createQueryBuilder(LectureEntity, 'lecture')
            .andWhere('capacity > current')
            .setLock('pessimistic_write');
        }
        if (entity.id) queryBuilder.andWhere('id = :id', { id: entity.id });
        if (entity.ids) queryBuilder.andWhere('id in (:...id)', { id: entity.ids});
        if (entity.lectureId) queryBuilder.andWhere('lectrueId = :lectureId', { lectrueId: entity.lectureId});
        if (entity.instructor) queryBuilder.andWhere('lecture.instructor = :instructor', { instructor: entity.instructor });
        if (entity.date) {
            queryBuilder.andWhere('date = :date', {date: entity.date});
        }
        return await queryBuilder.getMany();;

    }

    //강의 현원 업데이트 기능
    async updateCurrent(entity: LectureEntity, manager: EntityManager): Promise<UpdateResult> {

        let queryBuilder = this.repository.createQueryBuilder('lecture');
        if(manager) queryBuilder = manager.createQueryBuilder(LectureEntity, 'lecture');

        return await queryBuilder
            .update(LectureEntity)
            .set({ current: () => "current + 1" }) // current 값에 increment를 더함
            .where("id = :id", { id: entity.id })
            .andWhere("current < capacity")
            .execute();

    }

}