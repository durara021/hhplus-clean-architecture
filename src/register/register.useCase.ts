import { Injectable } from "@nestjs/common";
import { RegisterReqDto, RegisterResDto } from "./dto";
import { LectureService } from "../lecture/lecture.service";
import { LectureDomain } from "../lecture/domain/lecture.domain";
import { RegisterService } from "./register.service";
import { RegisterDomain } from "./domain/register.domain";
import { RegisterMapper } from "./register.mapper";
import { RegisterEntity } from "./entity/register.entity";
import { DataSource, EntityManager } from "typeorm";
import { LectureResDto } from "../lecture/dto";
import { LectureMapper } from "../lecture/lecture.mapper";
import { UserService } from "../user/user.service";
import { UserDomain } from "../user/domain/user.domain";

@Injectable()
export class RegisterUseCase {

    constructor(
        private readonly dataSource: DataSource,
        private readonly lectureService: LectureService,
        private readonly userService: UserService,
        private readonly registerService: RegisterService,
    ) {}

    //강의 신청
    async regist(dto: RegisterReqDto): Promise<RegisterResDto | null> {

        return await this.dataSource.transaction(async (manager: EntityManager) => {

            // 강의 조회(현재 신청 가능한 강의인지)
            const isPossible = await this.lectureService.lectures(new LectureDomain(dto.lecture, null, null, null, null, null, null, null, null, null, null), manager);

            // 유저 조회(현재 등록되어 있는 유저인지)
            const checkRegist = await this.registerService.checkRegist(RegisterMapper.ReqDtoToDomain(dto), manager);

            if(isPossible.length > 0 && checkRegist == null) {
                
                //강의 등록 테이블 insert
                const foundEntity = await this.registerService.regist(RegisterMapper.ReqDtoToDomain(dto), manager);
                let foundDomain = RegisterMapper.EntityToDomain(foundEntity);

                //강의 테이블의 현재인원 update
                await this.lectureService.updateCurrent(new LectureDomain(dto.lecture, null, null, null, null, null ,null, null, null, null, null), manager);
                
                return RegisterMapper.DomainToResDto(foundDomain);

            }

            return null;

        });

    }

    //내 강의 조회
    async myLectures(dto: RegisterReqDto): Promise<LectureResDto[]> {

        return await this.dataSource.transaction(async () => {
           
            const reqDomain = RegisterMapper.ReqDtoToDomain(dto);
            const resEntitys: RegisterEntity[] = await this.registerService.myLectures(reqDomain);
            let resDomains: RegisterDomain[] = RegisterMapper.EntityArrayToDomainArray(resEntitys);

            const lectureIds = resDomains.map((registerDomain) => registerDomain.lecture);
            const lectures = await this.lectureService.lectures(new LectureDomain(null, lectureIds, null, null, null,null,null, null, null, null, null));
            let foundLectureEntity = LectureMapper.EntityArrayToDomainArray(lectures);

            const userIds = lectures.map((lectureDomain) => lectureDomain.instructor);
            let instructors = await this.userService.user(new UserDomain(null, userIds, null, null, null));

            // resDomains의 instructor ID를 instructors의 이름으로 교체
            foundLectureEntity = foundLectureEntity.map((lectureDomain) => {
                const instructor = instructors.find(user => user.id === lectureDomain.instructor);
                if (instructor) {
                    // instructor 필드에 강사의 이름으로 대체
                    lectureDomain.instructorName = instructor.name;
                }
                return lectureDomain;
            });

            
            
            return LectureMapper.DomainArrayToResDtoArray(foundLectureEntity);

        });

    }

}
