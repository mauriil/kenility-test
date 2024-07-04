import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'jacket-1',
    description: 'The SKU of the product',
  })
  @IsString()
  @IsNotEmpty({ message: 'You must provide a SKU' })
  public sku: string;

  @ApiProperty({ example: 'Lorem ipsum jacket' })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'You must provide a name' })
  public name: string;

  @ApiProperty({ example: 12.45 })
  @IsNumber()
  @IsNotEmpty({ message: 'You must provide a price' })
  public price: number;
}
