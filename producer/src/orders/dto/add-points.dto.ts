import { ApiProperty } from '@nestjs/swagger';
import {
    IsNumber,
    MaxLength,
    MinLength
} from 'class-validator';

export class AddPointsDto {
    @IsNumber()
    @MinLength(5)
    @ApiProperty({ required: true })
    points: number;

    @IsNumber()
    @MaxLength(300)
    @ApiProperty({ required: true })
    customer_id?: number;
}
