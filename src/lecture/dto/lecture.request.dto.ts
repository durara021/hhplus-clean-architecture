// 내부 엔티티나 비즈니스 로직에서 사용하는 Lecture 모델
export class LectureReqDto {

    id: number;
    lectureId: number;
    title: string;
    instructor: number;
    date: Date;
    capacity: number;
    current: number;
    regDate: number;

    constructor(
        id: number,
        lectureId: number,
        title: string,
        instructor: number,
        date: Date,
        capacity: number,
        current: number,
        regDate: number
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
