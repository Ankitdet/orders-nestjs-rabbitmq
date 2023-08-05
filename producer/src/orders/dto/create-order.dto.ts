import { ApiProperty } from '@nestjs/swagger';
import {
    IsNumber,
    MaxLength,
    MinLength
} from 'class-validator';

export class CreateOrderDto {
    @IsNumber()
    @MinLength(5)
    @ApiProperty({ required: true })
    book_id: number;

    @IsNumber()
    @MaxLength(300)
    @ApiProperty({ required: true })
    customer_id?: number;
}
