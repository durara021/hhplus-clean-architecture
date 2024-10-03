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
        if(manager) queryBuilder = manager.createQueryBuilder(LectureEntity, 'lecture');
            queryBuilder
            .andWhere('capacity > current')
            .setLock('pessimistic_write');
        
        if (entity.id) queryBuilder.andWhere('id = :id', { id: entity.id });
        if (entity.ids) queryBuilder.andWhere('id in (:...id)', { id: entity.ids});
        if (entity.instructor) queryBuilder.andWhere('lecture.instructor = :instructor', { instructor: entity.instructor });
 
        return await queryBuilder.getMany();;

    }

}