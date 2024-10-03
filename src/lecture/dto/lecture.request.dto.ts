import { Type } from "class-transformer";
import { IsDate, IsInt, IsOptional, IsString } from "class-validator";

// 내부 엔티티나 비즈니스 로직에서 사용하는 Lecture 모델
export class LectureReqDto {

    @IsOptional()
    @Type(()=>Number)
    @IsInt()
    id: number | null;

    @IsOptional()
    @Type(()=>Number)
    @IsInt()
    lectureId: number | null;

    @IsOptional()
    @IsString()
    title: string | null;

    @IsOptional()
    @Type(()=>Number)
    @IsInt()
    instructor: number | null;

    @IsOptional()
    @Type(()=> Date)
    @IsDate()
    date: Date | null;

    @IsOptional()
    @Type(()=>Number)
    @IsInt()
    capacity: number | null;

    @IsOptional()
    @Type(()=>Number)
    @IsInt()
    current: number | null;

    @IsOptional()
    @Type(()=> Date)
    @IsDate()
    regDate: Date | null;

    constructor(
        id: number,
        lectureId: number,
        title: string,
        instructor: number,
        date: Date,
        capacity: number,
        current: number,
        regDate: Date
    ) {
        this.id = id;
        this.lectureId = lectureId;
        this.title = title;
        this.instructor = instructor;
        this.date = date;
        this.capacity = capacity;
        this.current = current;
        this.regDate = regDate;
    }
}
