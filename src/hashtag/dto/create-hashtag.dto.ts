import { IsNotEmpty, IsString, IsArray, ArrayNotEmpty, IsInt } from 'class-validator';

export class CreateHashtagDto {
  @IsNotEmpty()
  @IsString()
  tag: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  postIds: number[];
}
