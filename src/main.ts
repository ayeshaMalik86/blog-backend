import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AuthService } from './auth/auth.service';

let app: any;

async function bootstrap() {
  if (!app) {
    app = await NestFactory.create(AppModule);

    // Set global prefix for API routes
    app.setGlobalPrefix('api');

    app.enableCors({
      origin: [
        'http://localhost:5173',
        'https://blog-frontend-mu-navy.vercel.app',
      ],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    const authService = app.get(AuthService);
    await authService.createDefaultAdmin();

    await app.init();
  }
  return app;
}

// For Vercel serverless
if (process.env.NODE_ENV === 'production') {
  bootstrap().then(app => {
    module.exports = app.getHttpAdapter().getInstance();
  });
} else {
  // For local development
  bootstrap().then(app => {
    const port = process.env.PORT || 3000;
    app.listen(port);
  });
}
