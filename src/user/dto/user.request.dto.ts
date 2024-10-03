import { Type } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";

// 내부 엔티티나 비즈니스 로직에서 사용하는 Lecture 모델
export class UserReqDto {

    @IsOptional()
    @Type(()=>Number)
    @IsInt()
    
    id: number | null;

    constructor(
        id: number,
    ) {
        this.id = id;
    }
}
