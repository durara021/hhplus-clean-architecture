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
    async lectures(@Query('id') id: string, @Query('instructor') instructor: string): Promise<LectureResDto[]> {

        return this.lectureCase.lectures(new LectureReqDto(parseInt(id), null, null, parseInt(instructor), null, null, null, null));

    }

}