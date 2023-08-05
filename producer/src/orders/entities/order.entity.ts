import { ApiProperty } from '@nestjs/swagger';

export class OderEntity {
  @ApiProperty()
  tags: string[];

  @ApiProperty()
  book_id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false, nullable: true })
  description: string | null;

  @ApiProperty()
  body: string;

  @ApiProperty()
  published: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  writer: string;

  @ApiProperty()
  coverImage: string;

  @ApiProperty()
  price: number;
}