import { Controller, Post, Body } from '@nestjs/common';
import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiProperty } from '@nestjs/swagger';
import { AIProvidersService } from './ai-providers.service';

export class EnhanceSceneDto {
  @ApiProperty({ example: 'A knight standing by a castle' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'cinematic' })
  @IsString()
  @IsNotEmpty()
  style: string;
}

export class ExpandStoryDto {
  @ApiProperty({ example: 'A dragon finds a village in the clouds' })
  @IsString()
  @IsNotEmpty()
  prompt: string;

  @ApiProperty({ example: 'anime' })
  @IsString()
  @IsNotEmpty()
  style: string;
}

export class GenerateVisualDto {
  @ApiProperty({ example: 'A sunset over mountains' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'cinematic' })
  @IsString()
  @IsNotEmpty()
  style: string;

  @ApiProperty({ enum: ['image', 'video'], required: false })
  @IsOptional()
  @IsIn(['image', 'video'])
  type?: 'image' | 'video';
}

@ApiTags('ai')
@Controller('ai')
export class AIProvidersController {
  constructor(private readonly aiProvidersService: AIProvidersService) {}

  @Post('enhance-scene')
  @ApiOperation({ summary: 'Enhance scene description', description: 'Uses LLM to improve a short scene description for visual generation.' })
  @ApiBody({ type: EnhanceSceneDto })
  @ApiResponse({ status: 200, description: 'Enhanced description', schema: { properties: { description: { type: 'string' } } } })
  async enhanceScene(@Body() dto: EnhanceSceneDto) {
    const enhanced = await this.aiProvidersService.enhanceSceneDescription(
      dto.description,
      dto.style,
    );
    return { description: enhanced };
  }

  @Post('expand-story')
  @ApiOperation({ summary: 'Expand story', description: 'Expands a short prompt into a full story with scenes (LLM).' })
  @ApiBody({ type: ExpandStoryDto })
  @ApiResponse({ status: 200, description: 'Expanded story with scenes' })
  async expandStory(@Body() dto: ExpandStoryDto) {
    const story = await this.aiProvidersService.expandStory(dto.prompt, dto.style);
    return story;
  }

  @Post('generate-visual')
  @ApiOperation({ summary: 'Generate image or video', description: 'Generates an image or video for a scene via Replicate (Stable Diffusion / Stable Video Diffusion).' })
  @ApiBody({ type: GenerateVisualDto })
  @ApiResponse({ status: 200, description: 'Generated asset URL', schema: { properties: { url: { type: 'string' } } } })
  async generateVisual(@Body() dto: GenerateVisualDto) {
    const url = await this.aiProvidersService.generateVisual(
      dto.description,
      dto.style,
      dto.type || 'image',
    );
    return { url };
  }
}
