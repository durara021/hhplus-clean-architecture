import { Controller, Get, Param, Query } from '@nestjs/common';
import { LectureUseCase } from './lecture.useCase';
import { LectureReqDto, LectureResDto } from './dto';

@Controller('lecture')
export class LectureController {

    constructor(
        private readonly lectureCase: LectureUseCase
    ) {}

    // 강의 조회
    @Get('lectures')
    async lectures(@Query()query: LectureReqDto): Promise<Map<string, LectureResDto[]>> {

        return this.lectureCase.lectures(query);

    }

    @Get('lecturesByDay')
    async lecturesByDay(@Query()query: LectureReqDto): Promise<LectureResDto[]> {

        return this.lectureCase.lecturesByDay(query);

    }

}