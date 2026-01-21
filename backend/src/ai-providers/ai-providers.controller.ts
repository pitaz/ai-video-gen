import { Controller, Post, Body } from '@nestjs/common';
import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';
import { AIProvidersService } from './ai-providers.service';

export class EnhanceSceneDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  style: string;
}

export class ExpandStoryDto {
  @IsString()
  @IsNotEmpty()
  prompt: string;

  @IsString()
  @IsNotEmpty()
  style: string;
}

export class GenerateVisualDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  style: string;

  @IsOptional()
  @IsIn(['image', 'video'])
  type?: 'image' | 'video';
}

@Controller('ai')
export class AIProvidersController {
  constructor(private readonly aiProvidersService: AIProvidersService) {}

  @Post('enhance-scene')
  async enhanceScene(@Body() dto: EnhanceSceneDto) {
    const enhanced = await this.aiProvidersService.enhanceSceneDescription(
      dto.description,
      dto.style,
    );
    return { description: enhanced };
  }

  @Post('expand-story')
  async expandStory(@Body() dto: ExpandStoryDto) {
    const story = await this.aiProvidersService.expandStory(dto.prompt, dto.style);
    return story;
  }

  @Post('generate-visual')
  async generateVisual(@Body() dto: GenerateVisualDto) {
    const url = await this.aiProvidersService.generateVisual(
      dto.description,
      dto.style,
      dto.type || 'image',
    );
    return { url };
  }
}
