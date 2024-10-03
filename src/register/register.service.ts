import { Injectable } from "@nestjs/common";
import { RegisterRepositoryInterface } from "./register.repository.interface";
import { RegisterDomain } from "./domain/register.domain";
import { RegisterEntity } from "./entity/register.entity";
import { RegisterMapper } from "./register.mapper";
import { EntityManager } from "typeorm";

@Injectable()
export class RegisterService {

    constructor(
        private readonly registerRepository: RegisterRepositoryInterface,
    ) {}

    // 강의 신청
    async regist(domain: RegisterDomain, manager?: EntityManager): Promise<RegisterEntity> {
        
        return this.registerRepository.regist(RegisterMapper.DomainToEntity(domain), manager);
        
    }

    async checkRegist(domain: RegisterDomain, manager?: EntityManager) : Promise<RegisterEntity> {
        
        return this.registerRepository.checkRegist(RegisterMapper.DomainToEntity(domain), manager);

    }

    //신청 강의 조회
    async myLectures(domain: RegisterDomain, manager?: EntityManager): Promise<RegisterEntity[]> {

        return this.registerRepository.myLectures(RegisterMapper.DomainToEntity(domain), manager);

    }

}
