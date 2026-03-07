import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { StoriesModule } from './stories/stories.module';
import { JobsModule } from './jobs/jobs.module';
import { MediaModule } from './media/media.module';
import { AIProvidersModule } from './ai-providers/ai-providers.module';

const redisUrl = process.env.REDIS_URL;
const redisConfig = redisUrl
  ? { url: redisUrl, maxRetriesPerRequest: 1 }
  : {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379', 10),
      maxRetriesPerRequest: 1,
    };

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRoot({
      redis: redisConfig,
    }),
    StoriesModule,
    JobsModule,
    MediaModule,
    AIProvidersModule,
  ],
})
export class AppModule {}
