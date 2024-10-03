

// 클라이언트에게 반환될 데이터 전송용 resLecture DTO
export class RegisterResDto {
    id: number;
    lecture: number;
    user: number;
    regDate: number;

    constructor(
        id: number,
        lecture: number,
        user: number,
        regDate: number,
    ) {
        this.id = id;
        this.lecture = lecture;
        this.user = user;
        this.regDate = regDate;
    }
    
}