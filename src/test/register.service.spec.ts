import { Test, TestingModule } from '@nestjs/testing';
import { RegisterService } from '../register/register.service';
import { RegisterRepositoryInterface } from '../register/register.repository.interface';
import { RegisterDomain } from '../register/domain/register.domain';
import { EntityManager } from 'typeorm';

describe('RegisterService', () => {

  let registerService: RegisterService;
  let registerRepository: Partial<RegisterRepositoryInterface>; // Partial로 변경

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterService,
        {
          provide: RegisterRepositoryInterface,
          useValue: {
            regist: jest.fn(), // 각 메서드를 jest.fn()으로 모킹
            checkRegist: jest.fn(),
            myLectures: jest.fn(),
          },
        },
      ],
    }).compile();

    registerService = module.get<RegisterService>(RegisterService);
    registerRepository = module.get<RegisterRepositoryInterface>(RegisterRepositoryInterface);
    
  });

  it('트랜잭션 오류로 인해 강의 등록에 실패해야 함', async () => {
    // Given: 신청할 강의 정보
    const domain = new RegisterDomain(1, 2, null, null); // userId: 1, lectureId: 2

    // 트랜잭션 실패 시뮬레이션
    (registerRepository.regist as jest.Mock).mockRejectedValue(new Error('Transaction failed'));

    // When: 강의 신청 시 트랜잭션 오류가 발생
    const manager = {} as EntityManager;
    
    // Then: 오류를 던져야 함
    await expect(registerService.regist(domain, manager)).rejects.toThrow('Transaction failed');
  });

  it('조회된 강의가 없을 때 강의 조회에 실패해야 함', async () => {
    // Given: 신청한 강의가 없을 때
    const domain = new RegisterDomain(1, null, null, null); // userId: 1
    (registerRepository.myLectures as jest.Mock).mockResolvedValue([]);

    // When: 신청한 강의를 조회할 때
    const result = await registerService.myLectures(domain);

    // Then: 빈 배열이 반환되어야 함
    expect(result).toEqual([]);

    // Fail 시나리오: 강의가 존재하지 않으므로 실패
    await expect(registerService.myLectures(domain)).resolves.toEqual([]);
  });
  
});
