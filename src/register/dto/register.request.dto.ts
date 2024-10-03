import { Type } from "class-transformer";
import { IsDate, IsInt, IsOptional } from "class-validator";

// 내부 엔티티나 비즈니스 로직에서 사용하는 Lecture 모델
export class RegisterReqDto {

    @IsInt()
    @IsOptional()
    @Type(()=>Number)
    id: number | null;

    @IsInt()
    @IsOptional()
    @Type(()=>Number)
    lecture: number | null;

    @IsInt()
    @IsOptional()
    @Type(()=>Number)
    user: number | null;

    @IsDate()
    @IsOptional()
    @Type(()=>Date)
    regDate: Date | null;

    constructor(
        id: number,
        lecture: number,
        user: number,
        regDate: Date,
    ) {
        this.id = id;
        this.lecture = lecture;
        this.user = user;
        this.regDate = regDate;
    }

}