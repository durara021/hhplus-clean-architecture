import { Test, TestingModule } from '@nestjs/testing';
import { LectureService } from '../lecture/lecture.service';
import { LectureRepositoryInterface } from '../lecture/lecture.repository.interface';
import { LectureDomain } from '../lecture/domain/lecture.domain';
import { UpdateResult } from 'typeorm';

describe('LectureService', () => {

  let lectureService: LectureService;
  let lectureRepository: Partial<LectureRepositoryInterface>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LectureService,
        {
          provide: LectureRepositoryInterface,
          useValue: {
            lectures: jest.fn(),
            updateCurrent: jest.fn(),
          },
        },
      ],
    }).compile();

    lectureService = module.get<LectureService>(LectureService);
    lectureRepository = module.get<LectureRepositoryInterface>(LectureRepositoryInterface);

  });

  it('should fail to fetch lectures if repository throws an error', async () => {
    // Given: 요청을 처리하는 도중 repository에서 오류 발생
    const domain = new LectureDomain(1, null, null, null, null, null, null, null, null, null, null);

    // Repository가 오류를 던지도록 설정
    (lectureRepository.lectures as jest.Mock).mockRejectedValue(new Error('Database error'));

    // When/Then: 오류를 던져야 함
    await expect(lectureService.lectures(domain)).rejects.toThrow('Database error');
  });

  it('should fail to update lecture current students if update does not affect any rows', async () => {
    // Given: 강의 인원을 업데이트하려고 할 때
    const domain = new LectureDomain(1, null, null, null, null, null, null, null, null, null, null);
    
    // Repository의 updateCurrent가 업데이트된 행이 0인 경우
    const updateResult: UpdateResult = { affected: 0, raw: [], generatedMaps: [] }; // 모든 속성 정의
    (lectureRepository.updateCurrent as jest.Mock).mockResolvedValue(updateResult);

    // When: 강의 인원 업데이트
    const result = await lectureService.updateCurrent(domain);

    // Then: affected가 0이므로 실패로 간주해야 함
    expect(result).toBe(0); // 0이 반환되면 업데이트가 실패했음을 의미
  });

  it('should throw an error if updateCurrent fails in the repository', async () => {
    // Given: 강의 인원 업데이트 중 repository에서 오류가 발생
    const domain = new LectureDomain(1, null, null, null, null, null, null, null, null, null, null);

    // Repository의 updateCurrent가 오류를 던지도록 설정
    (lectureRepository.updateCurrent as jest.Mock).mockRejectedValue(new Error('Update failed'));

    // When/Then: 오류를 던져야 함
    await expect(lectureService.updateCurrent(domain)).rejects.toThrow('Update failed');
  });
});
