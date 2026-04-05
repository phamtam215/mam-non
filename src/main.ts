import 'dotenv/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import helmet from 'helmet'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Helmet: bật các security header (XSS Protection, Clickjacking, MIME sniffing, ...)
  app.use(helmet())

  // CORS: chỉ cho phép domain FE truy cập. Đặt ALLOWED_ORIGIN trong .env
  app.enableCors({
    origin: process.env.ALLOWED_ORIGIN ?? false,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  )

  // Swagger — chỉ bật khi không phải production
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Mầm Non API')
      .setDescription('API cho trang web trường mầm non')
      .setVersion('1.0')
      .addBearerAuth()
      .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document)
    console.log('Swagger UI: http://localhost:3000/api')
  }

  await app.listen(3000)
}
bootstrap()
