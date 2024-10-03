import { Type } from "class-transformer";
import { IsDate, IsInt, IsOptional } from "class-validator";

// 클라이언트에게 반환될 데이터 전송용 resLecture DTO
export class RegisterResDto {
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