import { Injectable } from "@nestjs/common";
import { UserRepositoryInterface } from "./user.repository.interface";
import { UserEntity as Entity, UserEntity } from "./entity/user.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
    constructor(
        @InjectRepository(UserEntity)
        private readonly repository: Repository<UserEntity>,
    ) {}

    async user(entity: UserEntity, manager: EntityManager): Promise<Entity[] | null> {

        let queryBuilder = this.repository.createQueryBuilder('user');
        if(manager) queryBuilder = manager.createQueryBuilder(UserEntity, 'user');

        if (entity.id) {
            queryBuilder.andWhere('user.id = :id', { id: entity.id });
        }

        if (entity.name) {
            queryBuilder.andWhere('user.name = :name', { name: entity.name });
        }

        return await queryBuilder.getMany();
        
    }

}