export class LectureDomain {
    static readonly MAX = 30;

    // 클래스 필드 선언
    id: number | null;
    ids: number[] | null;
    title: string | null;
    lectureId: number | null;
    instructor: number | null;
    instructorName: string | null;
    date: Date | null;
    capacity : number | null;
    current: number| null;
    isSpecial: number | null;
    updateMillis: number | null;

    constructor(
        id: number | null,
        ids: number[] | null,
        title: string | null,
        lectureId: number | null,
        instructor: number | null,
        instructorName: string | null,
        date: Date | null,
        capacity : number | null,
        current: number | null,
        isSpecial: number | null,
        updateMillis: number | null,
    ) {
        // 필드를 초기화
        this.id = id;
        this.ids = ids;
        this.title = title;
        this.lectureId = lectureId;
        this.instructor = instructor;
        this.instructorName = instructorName;
        this.date = date;
        this.capacity  = capacity ;
        this.current = current;
        this.isSpecial = isSpecial;
        this.updateMillis = updateMillis;
    }

}