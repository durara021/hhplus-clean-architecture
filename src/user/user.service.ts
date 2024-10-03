import { Injectable } from "@nestjs/common";
import { UserMapper } from "./user.mapper";
import { UserDomain } from "./domain/user.domain";
import { UserRepositoryInterface } from "./user.repository.interface";
import { UserEntity } from "./entity/user.entity";
import { EntityManager } from "typeorm";

@Injectable()
export class UserService {

    constructor(
        private readonly userRepository : UserRepositoryInterface
    ) {}

    async user(domain: UserDomain, manager?: EntityManager): Promise<UserEntity[]> {

        const userEntity = UserMapper.DomainToEntity(domain);

        return await this.userRepository.user(userEntity, manager);
    }

}
