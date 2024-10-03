import { LectureReqDto, LectureResDto } from './dto';
import { LectureDomain } from './Domain/lecture.Domain';
import { LectureEntity } from './entity/lecture.entity';

export class LectureMapper {

    static DtoToDomain(dto: LectureReqDto): LectureDomain {
        return new LectureDomain(
            dto.id, null, dto.title, dto.lectureId,dto.instructor, null, dto.date, dto.capacity, dto.current, null, null
        );
    }

    static DomainToEntity(domain: LectureDomain): LectureEntity {
        const entity = new LectureEntity();

        entity.id = domain.id;
        entity.ids = domain.ids;
        entity.title = domain.title;
        entity.lectureId = domain.lectureId;
        entity.instructor = domain.instructor; // 도메인에서 instructorId를 받아 UserEntity로 매핑
        entity.date = domain.date;
        entity.capacity = domain.capacity;
        entity.current = domain.current;
        entity.isSpecial = domain.isSpecial;
        entity.updateMillis = domain.updateMillis;
        
        return entity;
    }

    // Entity -> Domain 변환
    static EntityToDomain(entity: LectureEntity): LectureDomain {
        return new LectureDomain(
            entity.id,
            null,
            entity.title,
            entity.lectureId,
            entity.instructor,
            null,
            entity.date,
            entity.capacity,
            entity.current,
            entity.isSpecial,
            entity.updateMillis,
        )
    }

    static DomainToResDto(domain: LectureDomain): LectureResDto {
        return new LectureResDto(
            domain.lectureId,
            domain.title,
            domain.instructorName,
            domain.date,
            domain.capacity,
            domain.current,
            domain.isSpecial
        );
    }

    static EntityArrayToDomainArray(entities: LectureEntity[]): LectureDomain[] {
        return entities.map(entity => this.EntityToDomain(entity));
    }

    static DomainArrayToResDtoArray(domains: LectureDomain[]): LectureResDto[] {
        return domains.map(Domain => this.DomainToResDto(Domain));
    }

}