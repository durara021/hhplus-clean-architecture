import { Injectable } from "@nestjs/common";
import { DataSource, EntityManager } from "typeorm";
import { LectureService } from "./lecture.service";
import { LectureReqDto, LectureResDto }  from "./dto";
import { LectureMapper as Mapper } from "./lecture.mapper";
import { LectureDomain } from "./domain/lecture.domain";
import { UserService } from "../user/user.service";
import { UserDomain } from "../user/domain/user.domain";

@Injectable()
export class LectureUseCase {
    constructor(
        private readonly dataSource: DataSource,
        private readonly lectureService: LectureService,
        private readonly userService: UserService
    ) {}

    // 강의 조회
    async lectures(dto: LectureReqDto): Promise<LectureResDto[]> {
        return await this.dataSource.transaction(async (manager: EntityManager) => {
            const reqDomain: LectureDomain = Mapper.DtoToDomain(dto);

            // 강의 정보 조회
            const resEntitys = await this.lectureService.lectures(reqDomain);
            let resDomains = Mapper.EntityArrayToDomainArray(resEntitys);

            // 각 강의의 instructor ID 수집
            const userIds = resDomains.map((lectureDomain) => lectureDomain.instructor);

            // 강사 정보 조회
            const instructors = await this.userService.user(new UserDomain(null, userIds, null, null, null));

            // resDomains의 instructor ID를 강사의 이름으로 대체
            resDomains = resDomains.map((lectureDomain) => {
                const instructor = instructors.find(user => user.id === lectureDomain.instructor);
                if (instructor) {
                    // instructor 필드에 강사의 이름으로 대체
                    lectureDomain.instructorName = instructor.name;
                } else {
                    // 강사 정보가 없을 경우 기본값 설정 (옵션)
                    lectureDomain.instructorName = 'Unknown Instructor';
                }
                return lectureDomain;
            });

            // 강의 정보를 LectureResDto 배열로 변환하여 반환
            return Mapper.DomainArrayToResDtoArray(resDomains);
        });
    }

    // 강의 현원 추가
    async updateCurrent(dto: LectureReqDto): Promise<number | null> {
        return await this.dataSource.transaction(async () => {
            const model: LectureDomain = Mapper.DtoToDomain(dto);
            const result = await this.lectureService.updateCurrent(model);
            return result;
        });
    }
}
