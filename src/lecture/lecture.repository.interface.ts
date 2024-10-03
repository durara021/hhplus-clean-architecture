import { Injectable } from "@nestjs/common";
import { LectureEntity } from "./entity/lecture.entity";
import { EntityManager, UpdateResult } from "typeorm";
@Injectable()
export abstract class  LectureRepositoryInterface {

    abstract lectures(entity: LectureEntity, manager?: EntityManager): Promise<LectureEntity[]>
    
}