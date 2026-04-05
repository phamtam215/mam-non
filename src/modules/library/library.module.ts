import { Module } from '@nestjs/common'
import { LibraryController } from './library.controller'
import { LibraryService } from './library.service'
import { UploadModule } from '../upload/upload.module'

@Module({
  imports: [UploadModule],
  controllers: [LibraryController],
  providers: [LibraryService]
})
export class LibraryModule {}
