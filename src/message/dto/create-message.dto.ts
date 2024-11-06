import { IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class CreateMessageDto {
    @IsNotEmpty()
    content: string;

    @IsInt()
    @IsOptional()
    senderId: number; // ID of the sender

    @IsInt()
    receiverId: number; // ID of the receiver
}
