import { Injectable } from "@nestjs/common";
import { DataSource, EntityManager } from "typeorm";
import { LectureService } from "./lecture.service";
import { LectureReqDto, LectureResDto }  from "./dto";
import { LectureMapper } from "./lecture.mapper";
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
    async lectures(dto: LectureReqDto): Promise<Map<string, LectureResDto[]>> {
        return await this.dataSource.transaction(async () => {
            const reqDomain: LectureDomain = LectureMapper.DtoToDomain(dto);

            // 강의 정보 조회
            const resEntitys = await this.lectureService.lectures(reqDomain);
            let resDomains = LectureMapper.EntityArrayToDomainArray(resEntitys);

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

            // 날짜별로 그룹화하여 Map<Date, LectureDomain[]>로 변환
            const lecturesByDate = new Map<string, LectureResDto[]>();

            resDomains.forEach((lectureDomain) => {
                const lectureDate = lectureDomain.date.toISOString().split('T')[0]; // 날짜 부분만 추출
                
                // 해당 날짜가 이미 Map에 있으면, 기존 배열에 추가
                if (lecturesByDate.has(lectureDate)) {
                    const existingLectures = lecturesByDate.get(lectureDate);
                    if (existingLectures) {
                        existingLectures.push(LectureMapper.DomainToResDto(lectureDomain));
                    }
                } else {
                    // 새로 추가
                    lecturesByDate.set(lectureDate, [LectureMapper.DomainToResDto(lectureDomain)]);
                }
            });

            lecturesByDate.forEach((k, v) => {
                console.log(v);
                k.forEach(rs => {
                    console.log(rs);
                })
            });
            
            // 강의 정보를 LectureResDto 배열로 변환하여 반환
            return lecturesByDate;
            
        });
    }

    
    // 강의 조회
    async lecturesByDay(dto: LectureReqDto): Promise<LectureResDto[]> {
        return await this.dataSource.transaction(async () => {
            const reqDomain: LectureDomain = LectureMapper.DtoToDomain(dto);

            // 강의 정보 조회
            const resEntitys = await this.lectureService.lectures(reqDomain);
            let resDomains = LectureMapper.EntityArrayToDomainArray(resEntitys);

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
            return LectureMapper.DomainArrayToResDtoArray(resDomains);
            
        });
    }

    // 강의 현원 추가
    async updateCurrent(dto: LectureReqDto): Promise<number | null> {
        return await this.dataSource.transaction(async () => {
            const model: LectureDomain = LectureMapper.DtoToDomain(dto);
            const result = await this.lectureService.updateCurrent(model);
            return result;
        });
    }
}
