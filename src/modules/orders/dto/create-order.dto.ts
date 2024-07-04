import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsMongoId, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';

export class ProductDto {
  @ApiProperty({
    example: '60f8d4a0c6d7f1001f9f2e8d',
    description: 'The product id',
  })
  @IsMongoId()
  public _id: string;

  @ApiProperty({
    example: 1,
    description: 'The quantity of the product',
  })
  @IsNotEmpty({ message: 'The quantity is required' })
  @IsNumber()
  public quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({
    example: [
      {
        _id: '60f8d4a0c6d7f1001f9f2e8d',
        quantity: 1,
      },
    ],
    description: 'The products that are part of the order',
    isArray: true,
    type: [ProductDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  public products: {
    _id: string;
    quantity: number;
  }[];

  @ApiProperty({
    example: '60f8d4a0c6d7f1001f9f2e8d',
    description: 'The user that made the order',
  })
  @IsMongoId()
  public user: string;
}
