import { IsString, IsOptional, IsBoolean, IsInt, IsArray, IsDate } from 'class-validator';

export class CreatePostDto {
    @IsString()
    title: string; // Title of the post, required

    @IsOptional()
    @IsString()
    content?: string; // Optional content field

    @IsOptional()
    @IsBoolean()
    published?: boolean; // Optional published status

    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    mediaIds?: number[]; // Optional array of media IDs (e.g., image/video references)

    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    hashtagIds?: number[]; // Optional array of hashtag IDs

    @IsOptional()
    @IsInt()
    authorId?: number; // Optional, typically this is set on the server side, as the logged-in user
}
