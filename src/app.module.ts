import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ServeStaticModule } from '@nestjs/serve-static'
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './modules/auth/auth.module'
import { ContactModule } from './modules/contact/contact.module'
import { PostModule } from './modules/post/post.module'
import { LibraryModule } from './modules/library/library.module'

@Module({
  imports: [
    // Rate limiting toàn cục: tối đa 60 request/phút mỗi IP
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 60 }]),

    // Serve thư mục uploads/ tại URL /uploads/* với cache 7 ngày
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
      serveStaticOptions: {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày (ms)
        immutable: true
      }
    }),
    PrismaModule,
    AuthModule,
    ContactModule,
    PostModule,
    LibraryModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Áp dụng ThrottlerGuard cho toàn bộ app
    { provide: APP_GUARD, useClass: ThrottlerGuard }
  ]
})
export class AppModule {}
