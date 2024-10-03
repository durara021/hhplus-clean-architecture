import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString } from "class-validator";

// 클라이언트에게 반환될 데이터 전송용 resLecture DTO
export class UserResDto {
    @IsInt()
    @IsOptional()
    @Type(()=>Number)
    id: number | null;

    @IsString()
    @IsOptional()
    name: string | null;

    @IsInt()
    @IsOptional()
    @Type(()=>Number)
    isInstructor: number | null;

    @IsInt()
    @IsOptional()
    @Type(()=>Number)
    updateMillis: number | null;

    constructor(id: number, name: string, isInstructor: number, updateMillis: number) {
        this.id = id;
        this.name = name;
        this.isInstructor = isInstructor;
        this.updateMillis = updateMillis;
    }
}