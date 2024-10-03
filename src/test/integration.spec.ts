import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { LectureModule } from '../lecture/lecture.module';
import { UserModule } from '../user/user.module';
import { RegisterModule } from '../register/register.module';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { LectureEntity } from '../lecture/entity/lecture.entity';
import { UserEntity } from '../user/entity/user.entity';
import { RegisterEntity } from '../register/entity/register.entity';
import { DataSource, QueryRunner } from 'typeorm';

describe('통합테스트', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let queryRunner: QueryRunner;

  beforeAll(async () => {

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        LectureModule, UserModule, RegisterModule,
        TypeOrmModule.forRoot({
          type: 'mysql',  // 사용하려는 데이터베이스 유형 (예: mysql, sqlite 등)
          host: 'localhost', // 데이터베이스 호스트
          port: 3306,        // 포트 번호
          username: 'tester',  // 데이터베이스 사용자 이름
          password: 'qwe124!@$', // 데이터베이스 비밀번호
          database: 'hhpluscleanarchitecture',  // 사용할 데이터베이스 이름
          entities: [ LectureEntity, UserEntity, RegisterEntity ],  // 엔티티 배열
          //entities: [ __dirname + '/entitiy/*.entity{.ts,.js}' ],  // 엔티티 배열
          synchronize: true, // 개발 시 자동으로 스키마를 동기화 (생산 환경에서는 false로 설정 권장)
          extra: {
            connectionLimit: 100,
          },
          //logging: true
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // DataSource 객체 가져오기
    dataSource = app.get<DataSource>(getDataSourceToken());

    // QueryRunner 생성
    queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    
  });

  afterAll(async () => {
    // QueryRunner 해제 및 애플리케이션 종료
    await queryRunner.query('update lecture set current = 0;');
    await queryRunner.query('DELETE FROM register;');
    await queryRunner.release();
    await app.close();
  });

  it('동시에 40명이 신청했을 때 정원이 30명인 강의에 정확히 30명만 등록되어야 한다', async () => {
    const lectureId = 7; // 테스트용 강의 ID

    // 40개의 등록 요청 생성
    const registrationPromises = [];
    for (let i = 1; i <= 40; i++) {
      const userId = i; // 사용자 ID (1부터 40까지)
      const promise = request(app.getHttpServer())
        .get(`/register/regist?lecture=${lectureId}&user=${userId}`)
        .then((response) => response)
        .catch((err) => null); // 에러 무시
      registrationPromises.push(promise);
    }

    // 모든 요청을 동시에 전송
    await Promise.all(registrationPromises);

    let result = 0;
    await request(app.getHttpServer()).get(`/lecture/lecturesByDay?id=7`).then((response) => {
      result = response.body[0].current;
    });

    expect(result).toBe(30);

  });

  it('동일한 유저 정보로 같은 특강을 5번 신청했을 때, 1번만 성공하여야 한다.', async () => {
    const registrationPromises = [];

    //신청인원 29명 세팅
    await queryRunner.query('update lecture set current = 29 where id=8;');

    //동일한 강의에 5번 신청
    for (let i = 1; i <= 5; i++) {
      const promise = request(app.getHttpServer())
        .get(`/register/regist?lecture=8&user=30`)
        .then((response) => response)
        .catch((err) => null); // 에러 무시
      registrationPromises.push(promise);
    }

    await Promise.all(registrationPromises);

    let result = 0;
    await request(app.getHttpServer()).get(`/lecture/lecturesByDay?id=8`).then((response) => {
      result = response.body[0].current;
    });

    expect(result).toBe(30);

  });

});
