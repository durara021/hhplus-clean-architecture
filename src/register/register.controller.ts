import { Controller, Get, Param, Query } from '@nestjs/common';
import { RegisterUseCase } from './register.useCase';
import { RegisterReqDto, RegisterResDto } from './dto';
import { LectureResDto } from '../lecture/dto';

@Controller('register')
export class RegisterController {

    constructor(private readonly registerUseCase: RegisterUseCase) {}

    // 강의 신청 기능
    @Get('regist')
    async regist(@Query()query: RegisterReqDto): Promise<RegisterResDto> {

        return this.registerUseCase.regist(query);

    }

    // 내 강의 조회
    @Get('myLectures')
    async myLectures(@Query()query: RegisterReqDto): Promise<LectureResDto[]> {

        return this.registerUseCase.myLectures(query);

    }

}