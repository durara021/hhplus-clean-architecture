import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    //whitelist: true, // DTO에 없는 속성 자동 제거
    //forbidNonWhitelisted: true, // DTO에 없는 값이 들어오면 에러 발생
    transform: true, // 입력된 데이터를 자동으로 변환
  }));

  await app.listen(3000);
}
bootstrap();
