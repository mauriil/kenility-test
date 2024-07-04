import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from './pipes/fileValidationPipe';
import { NewProductDto } from './dto/new-product.dto';
import { Product } from './interfaces/products.iinterface';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiCreatedResponse({ type: NewProductDto })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  create(@UploadedFile(new FileValidationPipe()) file, @Body() createProductDto: CreateProductDto): Promise<NewProductDto> {
    const newProduct = { ...createProductDto, image: file.buffer };
    return this.productsService.create(newProduct);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: CreateProductDto, isArray: true })
  findAll(): Promise<CreateProductDto[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: CreateProductDto })
  findOne(@Param('id') id: string): Promise<CreateProductDto> {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: CreateProductDto })
  update(
    @Param('id') id: string,
    @UploadedFile(new FileValidationPipe()) file,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<CreateProductDto> {
    if (file) {
      updateProductDto.image = file.buffer;
    }
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse()
  remove(@Param('id') id: string): Promise<Product> {
    return this.productsService.remove(id);
  }
}
