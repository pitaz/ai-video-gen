import { Module } from '@nestjs/common';
import { AIProvidersService } from './ai-providers.service';

@Module({
  providers: [AIProvidersService],
  exports: [AIProvidersService],
})
export class AIProvidersModule {}
