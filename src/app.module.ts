import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './modules/auth/auth.module'
import { ContactModule } from './modules/contact/contact.module'
import { PostModule } from './modules/post/post.module'
import { LibraryModule } from './modules/library/library.module'

@Module({
  imports: [
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
