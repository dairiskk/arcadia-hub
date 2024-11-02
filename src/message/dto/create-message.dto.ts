import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateMessageDto {
    @IsNotEmpty()
    content: string;

    @IsInt()
    senderId: number; // ID of the sender

    @IsInt()
    receiverId: number; // ID of the receiver
}
