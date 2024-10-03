import { Controller, Get, Param } from '@nestjs/common';
import { UserUseCase } from './user.useCase';
import { UserReqDto, UserResDto } from './dto';


@Controller('user')
export class UserController {

    constructor(private readonly userUseCase: UserUseCase) {}

    // 유저 조회
    @Get(':id')
    async user(@Param('id') id: string): Promise<UserResDto[]> {

        return this.userUseCase.user(new UserReqDto(parseInt(id)));
       
    }

}