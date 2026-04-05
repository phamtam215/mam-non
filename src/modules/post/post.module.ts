import { Module } from '@nestjs/common'
import { PostController } from './post.controller'
import { PostService } from './post.service'
import { UploadModule } from '../upload/upload.module'

@Module({
  imports: [UploadModule],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
