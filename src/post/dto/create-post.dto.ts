import { IsNotEmpty, IsOptional, IsBoolean, IsInt } from 'class-validator';

export class CreatePostDto {
    @IsNotEmpty()
    title: string;

    @IsOptional()
    content?: string;

    @IsOptional()
    @IsBoolean()
    published?: boolean;

    @IsOptional()
    @IsInt()
    authorId?: number; // Optional since an author may not be assigned at creation
}
