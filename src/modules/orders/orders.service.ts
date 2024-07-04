import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Model } from 'mongoose';
import { Order } from './interfaces/orders.iinterface';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDERS_MODEL')
    private readonly orderModel: Model<Order>,
    @Inject(forwardRef(() => ProductsService))
    private readonly productService: ProductsService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const orderProducts = await Promise.all(
      createOrderDto.products.map(async (productDto) => {
        const product = await this.productService.findOne(productDto._id);
        if (!product) {
          throw new Error(`Product with ID ${productDto._id} not found`);
        }
        return {
          _id: product._id,
          product: product._id,
          price: product.price,
          quantity: productDto.quantity,
        };
      }),
    );

    const newOrder = await this.orderModel.create({
      products: orderProducts,
      user: createOrderDto.user,
      total: orderProducts.reduce((acc, product) => acc + product.price * product.quantity, 0),
    });

    const populatedOrder = await this.orderModel.findById(newOrder._id).populate('products.product').exec();

    return populatedOrder;
  }

  async findAll() {
    return await this.orderModel.find().populate('products.product').populate('user').exec();
  }

  async findOne(id: string) {
    const order = await this.orderModel
      .findById(id)
      .populate({
        path: 'products.product',
        select: 'sku name image',
      })
      .populate({
        path: 'user',
        select: '-password',
      })
      .exec();

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderModel.findById(id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    if (updateOrderDto.products) {
      const orderProducts = await Promise.all(
        updateOrderDto.products.map(async (productDto) => {
          const product = await this.productService.findOne(productDto._id);
          if (!product) {
            throw new NotFoundException(`Product ${productDto._id} not found`);
          }
          return {
            _id: product._id,
            product: product._id,
            price: product.price,
            quantity: productDto.quantity,
          };
        }),
      );
      updateOrderDto.total = orderProducts.reduce((acc, product) => acc + product.price * product.quantity, 0);
      updateOrderDto.products = orderProducts;
    }
    return await this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true });
  }

  async remove(id: string) {
    return await this.orderModel.findByIdAndDelete(id);
  }

  async finOrderWithHighestTotal() {
    return await this.orderModel.findOne().sort({ total: -1 }).populate('products.product').populate('user').exec();
  }
}
