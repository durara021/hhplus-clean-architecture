// 내부 엔티티나 비즈니스 로직에서 사용하는 Lecture 모델
export class RegisterReqDto {
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