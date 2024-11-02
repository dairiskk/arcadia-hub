import { IsOptional, IsBoolean } from 'class-validator';

export class UpdatePostDto {
    @IsOptional()
    title?: string;

    @IsOptional()
    content?: string;

    @IsOptional()
    @IsBoolean()
    published?: boolean;

    @IsOptional()
    authorId?: number; // Optional if the author is to be reassigned
}
