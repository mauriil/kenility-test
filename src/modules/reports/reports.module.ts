import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { ordersProviders } from '../orders/orders.providers';
import { OrdersService } from '../orders/orders.service';
import { DatabaseModule } from 'src/services/db/database.module';
import { productsProviders } from '../products/products.providers';
import { ProductsService } from '../products/products.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ReportsController],
  providers: [ReportsService, ...ordersProviders, OrdersService, ...productsProviders, ProductsService],
})
export class ReportsModule {}
