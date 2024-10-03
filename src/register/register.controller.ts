import { Controller, Get, Param, Query } from '@nestjs/common';
import { RegisterUseCase } from './register.useCase';
import { RegisterReqDto, RegisterResDto } from './dto';
import { LectureResDto } from '../lecture/dto';

@Controller('register')
export class RegisterController {

    constructor(private readonly registerUseCase: RegisterUseCase) {}

    // 강의 신청 기능
    @Get('regist')
    async regist(
        @Query('lecture') lecture: string,
        @Query('user') user: string
    ): Promise<RegisterResDto> {

        return this.registerUseCase.regist(new RegisterReqDto(null, parseInt(lecture), parseInt(user), Date.now()));

    }

    // 내 강의 조회
    @Get('myLectures')
    async myLectures(
        @Query('user') user: string
    ): Promise<LectureResDto[]> {

        return this.registerUseCase.myLectures(new RegisterReqDto(null, null, parseInt(user), null));

    }

}