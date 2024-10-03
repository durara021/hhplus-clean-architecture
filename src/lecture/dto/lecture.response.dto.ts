import { Type } from "class-transformer";
import { IsDate, IsInt, IsOptional, IsString } from "class-validator";

// 클라이언트에게 반환될 데이터 전송용 resLecture DTO
export class LectureResDto {
    @IsInt()
    @IsOptional()
    @Type(()=>Number)
    lectureId: number | null;

    @IsOptional()
    @IsString()
    title: string | null;
    
    @IsOptional()
    @IsString()
    instructorName: string | null;
    
    @IsOptional()
    @IsDate()
    date: Date | null;

    @IsInt()
    @IsOptional()
    @Type(()=>Number)
    capacity: number | null;


    @IsInt()
    @IsOptional()
    @Type(()=>Number)
    current: number;

    @IsInt()
    @IsOptional()
    @Type(()=>Number)
    isSpecial: number;

    constructor(
        lectureId: number,
        title: string,
        instructorName: string,
        date: Date,
        capacity: number,
        current: number,
        isSpecial: number
    ) {
        this.lectureId = lectureId;
        this.title = title;
        this.instructorName = instructorName;
        this.date = date;
        this.capacity = capacity;
        this.current = current;
        this.isSpecial = isSpecial;
    }

}