// 클라이언트에게 반환될 데이터 전송용 resLecture DTO
export class LectureResDto {
    lectureId: number;
    title: string;
    instructorName: string;
    date: Date;
    capacity: number;
    current: number;
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