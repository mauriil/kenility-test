import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { DatabaseModule } from 'src/services/db/database.module';
import { ordersProviders } from './orders.providers';
import { productsProviders } from '../products/products.providers';
import { ProductsService } from '../products/products.service';

@Module({
  imports: [DatabaseModule],
  controllers: [OrdersController],
  providers: [...ordersProviders, OrdersService, ...productsProviders, ProductsService],
})
export class OrdersModule {}
