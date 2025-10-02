import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestApplication } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthService } from './auth/auth.service';

let app: NestApplication;

async function bootstrap() {
  if (!app) {
    app = await NestFactory.create(AppModule);

    // Set global prefix for API routes
    app.setGlobalPrefix('api');

    app.enableCors({
      origin: [
        'http://localhost:5173',
        'https://blog-frontend-mocha-alpha.vercel.app',
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

    try {
      const authService = app.get(AuthService);
      await authService.createDefaultAdmin();
    } catch (error) {
      console.error('Error creating default admin:', error);
    }

    await app.init();
  }
  return app;
}

// For Vercel serverless
if (process.env.NODE_ENV === 'production') {
  let cachedApp: NestApplication;

  module.exports = async (req: any, res: any) => {
    try {
      if (!cachedApp) {
        cachedApp = await bootstrap();
      }
      const server = cachedApp.getHttpAdapter().getInstance();
      server(req, res);
    } catch (error) {
      console.error('Serverless function error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
} else {
  // For local development
  void bootstrap().then((app) => {
    const port = process.env.PORT || 3000;
    app.listen(port);
  });
}
