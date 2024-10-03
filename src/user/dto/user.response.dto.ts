
// 클라이언트에게 반환될 데이터 전송용 resLecture DTO
export class UserResDto {
    id: number;
    name: string;
    isInstructor: number;
    updateMillis: number;

    constructor(id: number, name: string, isInstructor: number, updateMillis: number) {
        this.id = id;
        this.name = name;
        this.isInstructor = isInstructor;
        this.updateMillis = updateMillis;
    }
}