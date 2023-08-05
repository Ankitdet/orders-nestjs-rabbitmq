import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreateCustomerDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @ApiProperty({ required: true })
    email: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(300)
    @ApiProperty({ required: true })
    name?: string;
}
