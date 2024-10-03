import { Injectable } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserEntity } from "./entity/user.entity";
import { UserMapper } from "./user.mapper";
import { UserReqDto } from "./dto";
import { DataSource, EntityManager } from "typeorm";

@Injectable()
export class UserUseCase {

    constructor(
        private readonly service: UserService,
        private readonly dataSource: DataSource
    ) {}

    //유저 조회
    async user(dto: UserReqDto): Promise<UserEntity[]> {

        return await this.dataSource.transaction(async () => {

            return this.service.user(UserMapper.ReqDtoToDomain(dto));
            
        });
        
    }

}
