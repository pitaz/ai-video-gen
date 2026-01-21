import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class CreateStoryDto {
  @IsString()
  @IsNotEmpty()
  prompt: string;

  @IsString()
  @IsIn(['cinematic', 'anime', 'kids', 'documentary'])
  style: string;
}
