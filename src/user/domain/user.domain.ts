export class UserDomain {
    // 클래스 필드 선언
    id: number | null;
    ids: number[] | null;
    name: string | null;
    isInstructor: number | null;
    updateMillis: number | null;

    constructor(
        id: number | null,
        ids: number[] | null,
        name: string | null,
        isInstructor: number | null,
        updateMillis: number | null,
    ) {
        // 필드 초기화
        this.id = id;
        this.ids  = ids;
        this.name = name;
        this.isInstructor = isInstructor;
        this.updateMillis = updateMillis;

    }

}
