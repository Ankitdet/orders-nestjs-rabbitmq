import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  title: string;


  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  @ApiProperty({ required: true })
  coverImage: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  @ApiProperty({ required: true })
  price: number

  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  @ApiProperty({ required: true })
  writer: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  @ApiProperty({ required: true })
  tags: string

}
