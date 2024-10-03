export class RegisterDomain {
    
    id: number | null;
    lecture: number | null;
    user: number | null;
    regDate: Date | null;

    constructor(
        id: number | null,
        lecture: number | null,
        user: number | null,
        regDate: Date | null,
    ) {
        // 필드 초기화
        this.id = id;
        this.lecture = lecture;
        this.user = user;
        this.regDate = regDate;
    }
}
