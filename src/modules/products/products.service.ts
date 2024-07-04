import { HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from 'mongoose';
import { Product } from './interfaces/products.iinterface';
import { NewProductDto } from './dto/new-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_MODEL')
    private readonly productsModel: Model<Product>,
  ) {}

  async create(createProductDto: NewProductDto): Promise<Product> {
    const product = await this.productsModel.findOne({ sku: createProductDto.sku });
    if (product) {
      throw new HttpException('Product with that sku already exists', 409);
    }
    const imgBase64 = this.convertImageToBase64(createProductDto.image);
    const createdProduct = await this.productsModel.create(createProductDto);
    return { ...createdProduct.toJSON(), image: imgBase64 };
  }

  private convertImageToBase64(image: Buffer | string): string {
    return image ? image.toString('base64') : null;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productsModel.find();
    return products.map((product) => {
      const imgBase64 = this.convertImageToBase64(product.image);
      return { ...product.toJSON(), image: imgBase64 };
    });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productsModel.findById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const imgBase64 = this.convertImageToBase64(product.image);
    return { ...product.toJSON(), image: imgBase64 };
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    return await this.productsModel.findByIdAndUpdate(id, updateProductDto, { new: true });
  }

  async remove(id: string): Promise<Product> {
    return await this.productsModel.findByIdAndDelete(id);
  }
}
