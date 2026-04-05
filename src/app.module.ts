import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
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
    // Serve thư mục uploads/ tại URL /uploads/*
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads'
    }),
    PrismaModule,
    AuthModule,
    ContactModule,
    PostModule,
    LibraryModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
