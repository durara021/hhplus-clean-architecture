import { Test, TestingModule } from '@nestjs/testing';
import { RegisterUseCase } from '../register/register.usecase';
import { LectureService } from '../lecture/lecture.service';
import { UserService } from '../user/user.service';
import { RegisterService } from '../register/register.service';
import { RegisterReqDto } from '../register/dto';
import { UserUseCase } from '../user/user.usecase';
import { UserEntity } from '../user/entity/user.entity';
import { UserReqDto } from 'src/user/dto';
import { LectureUseCase } from '../lecture/lecture.usecase';
import { DataSource, EntityManager } from 'typeorm';

describe('RegisterUseCase', () => {
  let registerUseCase: RegisterUseCase;
  let lectureService: LectureService;
  let userService: UserService;
  let registerService: RegisterService;
  let dataSource: DataSource;
  let userUseCase: UserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterUseCase,
        { provide: LectureService, useValue: { lectures: jest.fn(), updateCurrent: jest.fn() } },
        { provide: UserService, useValue: { user: jest.fn(), } },
        { provide: RegisterService, useValue: { regist: jest.fn(), checkRegist: jest.fn(), myLectures: jest.fn() }},
        { provide: DataSource, useValue: { transaction: jest.fn(), } },

        UserUseCase,
        { provide: UserService, useValue: { user: jest.fn() } },
        { provide: DataSource, useValue: { transaction: jest.fn((cb: (manager: EntityManager) => Promise<any>) => cb({} as EntityManager)) } },


        LectureUseCase,
        { provide: LectureService, useValue: { lectures: jest.fn(), updateCurrent: jest.fn() } },
        { provide: UserService, useValue: { user: jest.fn() } },
        { provide: DataSource, useValue: { transaction: jest.fn((cb: (manager: EntityManager) => Promise<any>) => cb({} as EntityManager)) } },
      ],
    }).compile();

    registerUseCase = module.get<RegisterUseCase>(RegisterUseCase);
    lectureService = module.get<LectureService>(LectureService);
    userService = module.get<UserService>(UserService);
    registerService = module.get<RegisterService>(RegisterService);
    dataSource = module.get<DataSource>(DataSource);
    userUseCase = module.get<UserUseCase>(UserUseCase);
    userService = module.get<UserService>(UserService);
    dataSource = module.get<DataSource>(DataSource);
  });

  it('강의가 존재하지 않으면 등록에 실패해야 함', async () => {
    // Given: 요청 데이터가 있고, 강의가 존재하지 않음
    const dto = new RegisterReqDto(1, 2, null ,null);
    (lectureService.lectures as jest.Mock).mockResolvedValue([]);

    // When/Then: 강의가 없으므로 null이 반환되어야 함
    await expect(registerUseCase.regist(dto)).resolves.toBeNull();
  });

  it('유저가 이미 등록된 경우 등록에 실패해야 함', async () => {
    // Given: 요청 데이터와 이미 등록된 유저가 있음
    const dto = new RegisterReqDto(null, null, null, null);
    (lectureService.lectures as jest.Mock).mockResolvedValue([{}]); // 강의는 존재함
    (registerService.checkRegist as jest.Mock).mockResolvedValue({}); // 유저는 이미 등록되어 있음

    // When/Then: 이미 등록된 유저는 신청이 실패해야 함
    await expect(registerUseCase.regist(dto)).resolves.toBeNull();
  });

  it('트랜잭션 실패 시 강의 현재 인원 업데이트에 실패해야 함', async () => {
    // Given: 강의가 존재하고, 유저는 등록되지 않았음
    const dto = new RegisterReqDto(null, null, null, null);
    (lectureService.lectures as jest.Mock).mockResolvedValue([{}]); // 강의는 존재함
    (registerService.checkRegist as jest.Mock).mockResolvedValue(null); // 유저는 등록되지 않음
    (registerService.regist as jest.Mock).mockResolvedValue({}); // 정상적으로 강의 신청 등록
    (lectureService.updateCurrent as jest.Mock).mockRejectedValue(new Error('Transaction failed'));

    // When/Then: 강의 현재 인원 업데이트가 실패하면 트랜잭션도 실패해야 함
    await expect(registerUseCase.regist(dto)).rejects.toThrow('Transaction failed');
  });

  it('내 강의 조회 중 데이터베이스 오류가 발생하면 실패해야 함', async () => {
    // Given: 내 강의 조회 중 데이터베이스 오류 발생
    const dto = new RegisterReqDto(null, null, null, null);
    (registerService.myLectures as jest.Mock).mockRejectedValue(new Error('Database error'));

    // When/Then: 데이터베이스 오류가 발생하면 예외를 던져야 함
    await expect(registerUseCase.myLectures(dto)).rejects.toThrow('Database error');
  });


  it('유저를 성공적으로 조회해야 함', async () => {
    // Given: 요청 데이터 생성
    const dto: UserReqDto = { id: 1 };
    const userEntity: UserEntity = { id: 1, ids: null, name: 'John Doe', isInstructor: 0, updateMillis: Date.now() };

    // Service가 유저 데이터를 반환하도록 설정
    (userService.user as jest.Mock).mockResolvedValue([userEntity]);

    // When: user 메서드 호출
    const result = await userUseCase.user(dto);

    // Then: 결과가 예상한 유저 엔티티 배열과 일치해야 함
    expect(result).toEqual([userEntity]);
  });

  it('유저가 없으면 빈 배열을 반환해야 함', async () => {
    // Given: 요청 데이터 생성
    const dto: UserReqDto = { id: 1 };

    // Service가 빈 배열을 반환하도록 설정
    (userService.user as jest.Mock).mockResolvedValue([]);

    // When: user 메서드 호출
    const result = await userUseCase.user(dto);

    // Then: 빈 배열이 반환되어야 함
    expect(result).toEqual([]);
  });

  it('유저 서비스에서 오류가 발생하면 실패해야 함', async () => {
    // Given: 요청 데이터 생성
    const dto: UserReqDto = { id: 1 };

    // Service가 오류를 던지도록 설정
    (userService.user as jest.Mock).mockRejectedValue(new Error('Database error'));

    // When/Then: 예외가 발생해야 함
    await expect(userUseCase.user(dto)).rejects.toThrow('Database error');
  });

});
