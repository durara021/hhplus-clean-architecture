import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LectureModule } from './lecture/lecture.module';
import { UserModule } from './user/user.module';
import { RegisterModule } from './register/register.module';
import { LectureEntity } from './lecture/entity/lecture.entity';
import { UserEntity } from './user/entity/user.entity';
import { RegisterEntity } from './register/entity/register.entity';

@Module({
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
      logging: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
