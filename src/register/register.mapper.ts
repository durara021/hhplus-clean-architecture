import { RegisterEntity } from './entity/register.entity';
import { RegisterDomain } from './domain/register.domain';
import { RegisterReqDto, RegisterResDto } from './dto';

export class RegisterMapper {
    
    // ReqDto -> Domain 변환
    static ReqDtoToDomain(reqDto: RegisterReqDto): RegisterDomain {
        return new RegisterDomain(
            null,  // id는 비즈니스 로직에서 나중에 처리되거나 데이터베이스에서 자동 생성
            reqDto.lecture,
            reqDto.user,
            reqDto.regDate,
        );
    }

    // Domain -> Entity 변환
    static DomainToEntity(domain: RegisterDomain): RegisterEntity {
        const entity = new RegisterEntity();

        entity.id = domain.id;
        entity.lecture = domain.lecture;
        entity.user = domain.user;
        entity.regDate = domain.regDate;

        return entity;
    }

    // Entity -> Domain 변환
    static EntityToDomain(entity: RegisterEntity): RegisterDomain {
        return new RegisterDomain(
            entity.id,
            entity.lecture,
            entity.user,
            entity.regDate,
        );
    }

    // Domain -> ResDto 변환
    static DomainToResDto(domain: RegisterDomain): RegisterResDto {
        return new RegisterResDto(
            domain.id,
            domain.lecture,
            domain.user,
            domain.regDate,
        );
    }

    static EntityArrayToDomainArray(entities: RegisterEntity[]): RegisterDomain[] {
        return entities.map(entity => this.EntityToDomain(entity));
    }

    static DomainArrayToResDtoArray(domains: RegisterDomain[]): RegisterResDto[] {
        return domains.map(domain => this.DomainToResDto(domain));
    }

}