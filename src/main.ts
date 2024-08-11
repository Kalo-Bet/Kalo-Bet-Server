import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
      credentials: true,
    });

    await app.listen(process.env.PORT || 3004, "0.0.0.0");
    console.log(`Application is running on: ${await app.getUrl()}`);
  } catch (error) {
    console.error('Error during application bootstrap:', error);
    process.exit(1);
  }
}

bootstrap().catch(err => {
  console.error('Unhandled error during bootstrap:', err);
  process.exit(1);
});