import 'dotenv/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import helmet from 'helmet'
import compression from 'compression'

async function bootstrap() {
  // Guard: đảm bảo các biến môi trường bắt buộc tồn tại trước khi khởi động
  const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET']
  for (const key of requiredEnvVars) {
    if (!process.env[key])
      throw new Error(`Thiếu biến môi trường bắt buộc: ${key}`)
  }

  const app = await NestFactory.create(AppModule)

  // Graceful shutdown: xử lý SIGTERM/SIGINT để đóng kết nối DB sạch sẽ
  app.enableShutdownHooks()

  // Gzip compression: giảm kích thước response JSON đáng kể (thường 60-80%)
  app.use(compression())

  // Helmet: bật các security header, cho phép ảnh /uploads/ được load cross-origin từ FE
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' }
    })
  )

  // CORS: chỉ cho phép domain FE truy cập. Đặt ALLOWED_ORIGIN trong .env
  const allowedOrigin = process.env.ALLOWED_ORIGIN
  app.enableCors({
    origin: allowedOrigin ? allowedOrigin.split(',').map(o => o.trim()) : true,
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

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
