const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../dist/app.module');
const { ValidationPipe } = require('@nestjs/common');
const { AuthService } = require('../dist/auth/auth.service');

let app;

async function createApp() {
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

    const authService = app.get(AuthService);
    await authService.createDefaultAdmin();

    await app.init();
  }
  return app;
}

module.exports = async (req, res) => {
  const nestApp = await createApp();
  const server = nestApp.getHttpAdapter().getInstance();
  server(req, res);
};
