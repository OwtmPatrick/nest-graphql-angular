import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export class AppBootstrap {
  static async initApp() {
    return await NestFactory.create(AppModule);
  }
}
