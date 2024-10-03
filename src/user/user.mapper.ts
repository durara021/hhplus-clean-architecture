import { UserEntity } from './entity/user.entity';
import { UserDomain } from './domain/user.domain';
import { UserReqDto, UserResDto } from './dto';

export class UserMapper {

    // ReqDto를 Domain로 변환
    static ReqDtoToDomain(dto: UserReqDto): UserDomain {
        return new UserDomain(
            dto.id, // id는 생성 후 자동으로 부여되므로, 0 또는 null 값으로 설정
            null,
            null,
            null,
            Date.now() // 새로 생성할 때 현재 시간을 기본값으로 설정
        );
    }

    // Entity를 Domain로 변환
    static EntityToDomain(entity: UserEntity): UserDomain {
        return new UserDomain(
            entity.id,
            null,
            entity.name,
            entity.isInstructor, 
            entity.updateMillis
        );
    }

    // Domain을 Entity로 변환
    static DomainToEntity(domain: UserDomain): UserEntity {
        const entity = new UserEntity();

        entity.id = domain.id,
        entity.ids = domain.ids,
        entity.name = domain.name,
        entity.isInstructor = domain.isInstructor, 
        entity.updateMillis = domain.updateMillis
        
        return entity;
    }



    // Domain을 ResDto로 변환
    static DomainToResDto(domain: UserDomain): UserResDto {
        return new UserResDto(
            domain.id,
            domain.name,
            domain.isInstructor,
            domain.updateMillis
        );
    }

    static EntityArrayToDomainArray(entities: UserEntity[]): UserDomain[] {
        return entities.map(entity => this.EntityToDomain(entity));
    }

    static DomainArrayToResDtoArray(models: UserDomain[]): UserResDto[] {
        return models.map(model => this.DomainToResDto(model));
    }

}