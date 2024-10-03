export class RegisterDomain {
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
        // 필드 초기화
        this.id = id;
        this.lecture = lecture;
        this.user = user;
        this.regDate = regDate;
    }

    
}
