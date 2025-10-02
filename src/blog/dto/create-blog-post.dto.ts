import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateBlogPostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  content: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  author: string;
}
