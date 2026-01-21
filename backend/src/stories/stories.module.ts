import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { StoriesController } from './stories.controller';
import { StoriesService } from './stories.service';
import { StoriesProcessor } from './stories.processor';
import { JobsModule } from '../jobs/jobs.module';
import { AIProvidersModule } from '../ai-providers/ai-providers.module';
import { MediaModule } from '../media/media.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'story-processing',
    }),
    JobsModule,
    AIProvidersModule,
    MediaModule,
  ],
  controllers: [StoriesController],
  providers: [StoriesService, StoriesProcessor],
})
export class StoriesModule {}
