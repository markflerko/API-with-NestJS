import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString({ each: true })
  @IsNotEmpty()
  paragraphs: string[];
  content: string;
  title: string;
}
