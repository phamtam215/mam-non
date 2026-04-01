import { Module } from '@nestjs/common'
import { IntroductionController } from './introduction.controller'
import { IntroductionService } from './introduction.service'

@Module({
  controllers: [IntroductionController],
  providers: [IntroductionService]
})
export class IntroductionModule {}
