import { Injectable } from "@nestjs/common";
import { UserEntity as Entity } from "./entity/user.entity";
import { EntityManager } from "typeorm";

@Injectable()
export abstract class  UserRepositoryInterface {

    abstract user(entity: Entity, manager?: EntityManager): Promise<Entity[] | null>;
    
}
