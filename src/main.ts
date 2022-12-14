import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /* Apply helmet middlewares */
  app.use(helmet());
  /* Enabling versioning for the API. */
  app.enableVersioning({
    type: VersioningType.URI,
  });
  /* Enabling CORS for the application. */
  app.enableCors({
    origin: [
      'http://127.0.0.1:5173',
      'https://master.d15cj9b33gfb5p.amplifyapp.com',
      'https://master.d1h1qx0ccllowj.amplifyapp.com',
    ],
    methods: 'GET,HEAD,PATCH,POST,DELETE,OPTIONS',
  });
  /* Configuring validation pipes */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  /* Creating a swagger document. */
  const config = new DocumentBuilder()
    .setTitle('Easy Story API')
    .setDescription('REST API made with NestJS')
    .setVersion('1.0')
    .setContact('Marco Manrique Acha', 'https://github.com/MarcoMnrq/', '')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  /* Telling the app to listen on port 3000. */
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
