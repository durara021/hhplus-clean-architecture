import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserUseCase } from './user.useCase';
import { UserReqDto, UserResDto } from './dto';


@Controller('user')
export class UserController {

    constructor(private readonly userUseCase: UserUseCase) {}

    // 유저 조회
    @Get(':id')
    async user(@Query()query: UserReqDto): Promise<UserResDto[]> {

        return this.userUseCase.user(query);
       
    }

}