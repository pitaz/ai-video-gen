import { IsString, IsNotEmpty, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStoryDto {
  @ApiProperty({ example: 'A dragon discovers a tiny village in the clouds' })
  @IsString()
  @IsNotEmpty()
  prompt: string;

  @ApiProperty({ enum: ['cinematic', 'anime', 'kids', 'documentary'] })
  @IsString()
  @IsIn(['cinematic', 'anime', 'kids', 'documentary'])
  style: string;
}
