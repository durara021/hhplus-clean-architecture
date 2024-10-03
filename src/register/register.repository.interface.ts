import { Injectable } from "@nestjs/common";
import { RegisterEntity } from "./entity/register.entity";
import { EntityManager } from "typeorm";

@Injectable()
export abstract class  RegisterRepositoryInterface {
    abstract regist(entity: RegisterEntity, manager?: EntityManager): Promise<RegisterEntity | null>;
    abstract checkRegist(entity: RegisterEntity, manager?: EntityManager): Promise<RegisterEntity | null>;
    abstract myLectures(entity: RegisterEntity, manager?: EntityManager): Promise<RegisterEntity[]>;
}
