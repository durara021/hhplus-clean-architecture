import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { UserRepositoryInterface } from '../user/user.repository.interface';
import { UserDomain } from '../user/domain/user.domain';
import { UserEntity } from '../user/entity/user.entity';

describe('UserService', () => {

  let userService: UserService;
  let userRepository: Partial<UserRepositoryInterface>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepositoryInterface,
          useValue: {
            user: jest.fn(), // user 메서드를 모킹합니다.
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepositoryInterface>(UserRepositoryInterface);

  });

  it('should fetch users successfully', async () => {
    // Given: 사용자 도메인 생성
    const domain = new UserDomain(1, null, 'John Doe', 1, Date.now()); // 예시 UserDomain 생성
    const userEntity = new UserEntity(); // 반환될 UserEntity
    userEntity.id = 1;
    userEntity.name = 'John Doe';
    userEntity.updateMillis = Date.now();

    // Repository가 데이터를 반환하도록 설정
    (userRepository.user as jest.Mock).mockResolvedValue([userEntity]);

    // When: user 메서드 호출
    const result = await userService.user(domain);

    // Then: 반환값이 예상과 일치하는지 확인
    expect(result).toEqual([userEntity]);
  });

  it('should fail to fetch users if repository throws an error', async () => {
    // Given: 사용자 도메인 생성
    const domain = new UserDomain(1, null, 'John Doe', 1, Date.now());

    // Repository에서 오류를 던지도록 설정
    (userRepository.user as jest.Mock).mockRejectedValue(new Error('Database error'));

    // When/Then: 오류가 발생해야 함
    await expect(userService.user(domain)).rejects.toThrow('Database error');
  });

  it('should return an empty array if no users are found', async () => {
    // Given: 사용자 도메인 생성
    const domain = new UserDomain(1, null, 'John Doe', 1, Date.now());

    // Repository가 빈 배열을 반환하도록 설정
    (userRepository.user as jest.Mock).mockResolvedValue([]);

    // When: user 메서드 호출
    const result = await userService.user(domain);

    // Then: 빈 배열을 반환해야 함
    expect(result).toEqual([]);
  });

});
