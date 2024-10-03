// 내부 엔티티나 비즈니스 로직에서 사용하는 Lecture 모델
export class UserReqDto {
    id: number;

    constructor(
        id: number,
    ) {
        this.id = id;
    }
}
