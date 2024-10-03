import { Injectable } from "@nestjs/common";
import { RegisterRepositoryInterface } from "./register.repository.interface";
import { RegisterEntity } from "./entity/register.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class RegisterRepository implements RegisterRepositoryInterface {
    constructor(
        @InjectRepository(RegisterEntity)
        private readonly repository: Repository<RegisterEntity>,
    ) {}

    //강의 신청
    async regist(entity: RegisterEntity, manager?: EntityManager): Promise<RegisterEntity> {

        if(manager) return await manager.save(entity);

        return await this.repository.save(entity);

    }

    //강의 조회
    async checkRegist(entity: RegisterEntity, manager?: EntityManager): Promise<RegisterEntity> {

        let queryBuilder = this.repository.createQueryBuilder('register');
        if(manager) queryBuilder = manager.createQueryBuilder(RegisterEntity, 'register');

        return await queryBuilder
            .where('lecture = :lecture', { lecture: entity.lecture })
            .andWhere('user = :user', { user: entity.user })
            .getOne(); 

    }

    //내 강의 조회
    async myLectures(entity: RegisterEntity, manager?: EntityManager): Promise<RegisterEntity[] | null> {

        if(manager) return await manager.find(RegisterEntity, { where: { user: entity.user } });
        
        return await this.repository.find({ where: { user: entity.user } });
        
    };

}